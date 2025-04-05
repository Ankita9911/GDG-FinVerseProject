import asyncio
import numpy as np
import faiss
from crawl4ai import AsyncWebCrawler
from quart import Quart, render_template, request, session, jsonify
import requests
import logging
import json
import os
import time

# --------------------------
# Logging Configuration
# --------------------------
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# --------------------------
# Quart App Setup
# --------------------------
app = Quart(__name__)
app.secret_key = "finacemonisha"  

# --------------------------
# Data Storage Setup (using text files)
# --------------------------
USER_DATA_FILE = "user_data.txt"
ANALYTICS_FILE = "analytics.txt"
CONVERSATION_HISTORY_FILE = "conversation_history.txt"

def append_to_file(filename, data):
    with open(filename, "a") as f:
        f.write(json.dumps(data) + "\n")

def save_user_data(data):
    append_to_file(USER_DATA_FILE, data)
    logging.info(f"Saved user data for {data.get('email', 'unknown')}")

def track_user_interaction(email, event, details={}):
    interaction = {
        "email": email,
        "event": event,
        "details": details
    }
    append_to_file(ANALYTICS_FILE, interaction)
    logging.info(f"Tracked interaction for {email}: {event}")

def store_conversation_history(email, conversation_entry):
    entry = {
        "email": email,
        "conversation": conversation_entry
    }
    append_to_file(CONVERSATION_HISTORY_FILE, entry)
    logging.info(f"Stored conversation history for {email}")

# --------------------------
# API Keys and Configurations
# --------------------------
# Replace with your Gemini API key
GEMINI_API_KEY = "AIzaSyAqEudCuTEvk_-TGg99pUbdTha3JcbRHBY"

if not GEMINI_API_KEY:
    logging.warning("GEMINI_API_KEY not set. Set it via environment variable or hardcode for testing.")

# --------------------------
# FAISS Index Persistence
# --------------------------
FAISS_INDEX_FILE = "faiss_index.index"
FAISS_METADATA_FILE = "faiss_metadata.json"

def create_faiss_index():
    dim = 1536  # Dimension used by the embedding model
    index = faiss.IndexFlatL2(dim)
    return index

index = create_faiss_index()
metadata_dict = {}

def save_faiss_index():
    faiss.write_index(index, FAISS_INDEX_FILE)
    with open(FAISS_METADATA_FILE, "w") as f:
        json.dump(metadata_dict, f)
    logging.info("FAISS index and metadata saved to disk.")

def load_faiss_index():
    global index, metadata_dict
    if os.path.exists(FAISS_INDEX_FILE) and os.path.exists(FAISS_METADATA_FILE):
        index = faiss.read_index(FAISS_INDEX_FILE)
        with open(FAISS_METADATA_FILE, "r") as f:
            metadata_dict = json.load(f)
        logging.info("FAISS index and metadata loaded from disk.")
    else:
        logging.info("No existing FAISS index found, starting fresh.")

load_faiss_index()

# --------------------------
# Data Enrichment Agent
# --------------------------
def data_enrichment_agent():
    """
    Provide additional static finance advisory context.
    """
    enrichment_text = (
        "Additional Finance Advisory: Stay updated with market trends and economic indicators. "
        "Always consult with professional financial advisors for tailored advice. 📈💼"
    )
    return enrichment_text

# --------------------------
# Helper: Get Embeddings
# --------------------------
def get_embeddings(text):
    """
    Convert text to an embedding vector.
    In production, replace this with a call to your embedding service.
    Here we use a random vector for demonstration.
    """
    return np.random.rand(1, 1536).astype(np.float32)

# --------------------------
# Helper: Chunk Text
# --------------------------
def chunk_text(text, max_tokens=500):
    words = text.split()
    chunks = []
    current_chunk = []
    for word in words:
        current_chunk.append(word)
        if len(current_chunk) >= max_tokens:
            chunks.append(" ".join(current_chunk))
            current_chunk = []
    if current_chunk:
        chunks.append(" ".join(current_chunk))
    return chunks

# --------------------------
# Store in FAISS
# --------------------------
def store_in_faiss(text, metadata):
    chunks = chunk_text(text)
    for chunk in chunks:
        embedding = get_embeddings(chunk)
        faiss.normalize_L2(embedding)
        index.add(embedding)
        current_ntotal = index.ntotal
        meta_copy = metadata.copy()
        meta_copy["text"] = chunk
        metadata_dict[str(current_ntotal - 1)] = meta_copy
    save_faiss_index()

# --------------------------
# Async Scraping Agent
# --------------------------
async def scrape_website(url, category="general", subcategory=""):
    async with AsyncWebCrawler() as crawler:
        result = await crawler.arun(url=url)
        markdown_text = result.markdown if result else ""
    metadata = {
        "source_url": url,
        "category": category,
        "subcategory": subcategory
    }
    store_in_faiss(markdown_text, metadata)
    logging.info(f"Scraped and stored data from {url}")

# --------------------------
# FAISS Search Agent
# --------------------------
def search_faiss(query, category_filter="", subcategory_filter=""):
    query_embedding = get_embeddings(query)
    faiss.normalize_L2(query_embedding)
    D, I = index.search(query_embedding, k=3)
    logging.info(f"FAISS distances: {D[0]}, indices: {I[0]}")
    relevant_chunks = []
    for idx in I[0]:
        if idx == -1:
            continue
        meta = metadata_dict.get(str(idx), {})
        if category_filter and meta.get("category") != category_filter:
            continue
        if subcategory_filter and meta.get("subcategory") != subcategory_filter:
            continue
        chunk_text_val = meta.get("text", "")
        relevant_chunks.append(chunk_text_val)
    if relevant_chunks:
        return "\n\n".join(relevant_chunks)
    return ""

# --------------------------
# Gemini API Call (Short & Crispy Output)
# --------------------------
def gemini_api_call(prompt, max_tokens=200, temperature=0.7):
    """
    Call the Gemini API and format the response as short, bullet-pointed lines.
    """
    if not GEMINI_API_KEY:
        logging.error("Gemini API key is missing. Please set GEMINI_API_KEY.")
        return "Error: No Gemini API key provided."

    endpoint = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"
    headers = {"Content-Type": "application/json"}
    payload = {
        "contents": [{
            "parts": [{"text": prompt}]
        }]
    }
    try:
        response = requests.post(endpoint, headers=headers, json=payload)
        logging.info(f"Gemini status code: {response.status_code}")
        logging.info(f"Gemini response body: {response.text}")

        response.raise_for_status()
        data = response.json()

        # Extract the text and split it into short lines
        if "candidates" in data and len(data["candidates"]) > 0:
            candidate = data["candidates"][0]
            content = candidate.get("content", {})
            parts = content.get("parts", [])
            if parts and len(parts) > 0:
                output = parts[0].get("text", "").strip()
                # Format output into bullet points (limit to 5 lines)
                lines = output.split(". ")
                formatted_lines = []
                for line in lines:
                    stripped = line.strip()
                    if stripped:
                        formatted_lines.append(f"➡ {stripped}.")
                    if len(formatted_lines) >= 5:
                        break
                return "\n".join(formatted_lines)
            else:
                logging.error("No parts found in candidate.")
                return "Error: No text found in Gemini API response."
        else:
            logging.error(f"Unexpected Gemini API response format: {data}")
            return "Error generating response from Gemini API."
    except Exception as e:
        logging.error(f"Error calling Gemini API: {e}")
        return "Error generating response from Gemini API."

# --------------------------
# Personalized Finance Advice via Gemini API
# --------------------------
def generate_gemini_finance_advice(age, investment_amount, risk_tolerance, ticker,
                                   marriage, children, home_purchase,
                                   faiss_context=""):
    enrichment = data_enrichment_agent()
    prompt = f"""
You are a financial advisor providing personalized investment advice.

User Profile:
- Age: {age}
- Investment Amount: {investment_amount}
- Risk Tolerance: {risk_tolerance}
- Financial Instrument: {ticker}
- Marriage Planning: {marriage}
- Children/Education: {children}
- Home Purchase: {home_purchase}

Scraped Data Context:
{faiss_context}

Additional Advisory:
{enrichment}

Provide 5 concise bullet points (each as a short line) of actionable advice.
"""
    return gemini_api_call(prompt, max_tokens=200, temperature=0.7)

def generate_gemini_followup_response(followup_question, original_advice):
    prompt = f"""
You are a financial advisor. The user received the following advice:
{original_advice}

Now, the user asks: {followup_question}
Please provide additional guidance in up to 5 short bullet points.
"""
    return gemini_api_call(prompt, max_tokens=150, temperature=0.7)

def generate_gemini_tax_savings_advice(annual_income, current_savings, investment_options):
    prompt = f"""
You are a financial advisor specializing in tax and savings optimization.
User Financial Profile:
- Annual Income: {annual_income}
- Current Savings: {current_savings}
- Preferred Investment Options: {investment_options}

Provide 5 bullet-point tax & savings optimization tips in a concise format.
"""
    return gemini_api_call(prompt, max_tokens=200, temperature=0.7)

def generate_gemini_reply(message):
    prompt = f"""
You are a finance chatbot powered by Gemini AI.
User: {message}
Provide a concise, clear answer in up to 5 short bullet points.
"""
    return gemini_api_call(prompt, max_tokens=150, temperature=0.7)

# --------------------------
# Fallback Personalized Advice Function
# --------------------------
def get_finance_advice(age, investment_amount, risk_tolerance, ticker, marriage, children, home_purchase):
    query = (
        f"Ticker: {ticker}; Age: {age}; Investment Amount: {investment_amount}; "
        f"Risk Tolerance: {risk_tolerance}; Marriage: {marriage}; Children: {children}; Home Purchase: {home_purchase}"
    )
    faiss_context = search_faiss(query, category_filter="general", subcategory_filter="")
    if faiss_context.strip():
        logging.info("Using scraped data context for advice.")
        advice = generate_gemini_finance_advice(
            age, investment_amount, risk_tolerance, ticker,
            marriage, children, home_purchase,
            faiss_context=faiss_context
        )
    else:
        logging.info("No scraped data found. Using fallback Gemini prompt.")
        prompt = f"""
You are a financial advisor providing personalized investment advice.
User Profile:
- Age: {age}
- Investment Amount: {investment_amount}
- Risk Tolerance: {risk_tolerance}
- Financial Instrument: {ticker}
- Marriage Planning: {marriage}
- Children/Education: {children}
- Home Purchase: {home_purchase}

Provide 5 concise bullet points with actionable advice.
"""
        advice = gemini_api_call(prompt, max_tokens=200, temperature=0.7)
    return advice

# --------------------------
# Routes
# --------------------------
@app.route('/', methods=['GET', 'POST'])
async def home():
    if request.method == 'POST':
        form = await request.form
        name = form.get('name', "")
        age = form.get('age', "")
        email = form.get('email', "")
        ticker = form.get('ticker', "")  # Financial instrument symbol
        investment_amount = form.get('investment_amount', "")
        risk_tolerance = form.get('risk_tolerance', "")
        # Life events
        marriage = form.get('marriage', "no")
        children = form.get('children', "no")
        home_purchase = form.get('home_purchase', "no")
        features = form.getlist('features')
        
        # Generate personalized finance advice
        personalized_advice = get_finance_advice(
            age, investment_amount, risk_tolerance, ticker,
            marriage, children, home_purchase
        )
        
        # Save user data to text file
        user_data = {
            'name': name,
            'age': age,
            'email': email,
            'ticker': ticker,
            'investment_amount': investment_amount,
            'risk_tolerance': risk_tolerance,
            'marriage': marriage,
            'children': children,
            'home_purchase': home_purchase,
            'features': features
        }
        save_user_data(user_data)
        session['original_advice'] = personalized_advice
        track_user_interaction(email, "initial_advice_generated", {"ticker": ticker, "investment_amount": investment_amount})
        return await render_template(
            'success.html',
            advice=personalized_advice,
            ticker=ticker,
            investment_amount=investment_amount,
            risk_tolerance=risk_tolerance
        )
    return await render_template('home.html')

@app.route('/followup', methods=['GET', 'POST'])
async def followup():
    if request.method == 'POST':
        form = await request.form
        followup_question = form.get('followup_question', "")
        original_advice = session.get('original_advice', "")
        email = form.get('email', "")
        if not followup_question or not original_advice:
            return await render_template('followup.html', error="Missing follow-up question or session data.")
        followup_response = generate_gemini_followup_response(followup_question, original_advice)
        conversation_entry = {
            "followup_question": followup_question,
            "followup_response": followup_response
        }
        store_conversation_history(email, conversation_entry)
        track_user_interaction(email, "followup_generated", {"question": followup_question})
        return await render_template('followup.html', original_advice=original_advice, followup_response=followup_response)
    return await render_template('followup.html')

@app.route('/scrape', methods=['GET'])
async def scrape_and_store():
    logging.info("Starting scraping process...")
    urls = [
        "https://www.investopedia.com/",
        "https://www.bloomberg.com/markets",
        "https://www.cnbc.com/finance/",
        "https://www.ft.com/markets",
        "https://www.marketwatch.com/",
        "https://www.reuters.com/finance",
        "https://www.forbes.com/finance/",
        "https://www.wsj.com/news/business"
    ]
    for url in urls:
        logging.info(f"Scraping URL: {url}")
        await scrape_website(url, category="general", subcategory="")
    return "Scraped finance data has been stored in FAISS."

@app.route('/simulation', methods=['GET', 'POST'])
async def simulation():
    simulation_result = None
    if request.method == 'POST':
        form = await request.form
        try:
            current_savings = float(form.get('current_savings', 0))
            monthly_contribution = float(form.get('monthly_contribution', 0))
            annual_return = float(form.get('annual_return', 0)) / 100.0
            years = int(form.get('years', 0))
            # Calculate future value using compound interest formula
            future_value = current_savings * ((1 + annual_return) ** years)
            # Future value of monthly contributions (ordinary annuity formula)
            future_value += monthly_contribution * (
                ((1 + annual_return) ** years - 1) / annual_return
            )
            simulation_result = f"Estimated Future Value after {years} years: ${future_value:,.2f}"
        except Exception as e:
            simulation_result = f"Error in simulation: {str(e)}"
    return await render_template('simulation.html', simulation_result=simulation_result)

@app.route('/tax_savings', methods=['GET', 'POST'])
async def tax_savings():
    tax_advice = None
    if request.method == 'POST':
        form = await request.form
        annual_income = form.get('annual_income', "")
        current_savings = form.get('current_savings', "")
        investment_options = form.get('investment_options', "")
        tax_advice = generate_gemini_tax_savings_advice(annual_income, current_savings, investment_options)
    return await render_template('tax_savings.html', tax_advice=tax_advice)

@app.route('/chatbot', methods=['GET', 'POST'])
async def chatbot():
    if request.method == 'GET':
        return await render_template('chatbot.html')
    data = await request.get_json()
    user_message = data.get("message", "")
    reply = generate_gemini_reply(user_message)
    return jsonify({"reply": reply})

# --------------------------
# Run the App
# --------------------------
if __name__ == '__main__':
    app.run(debug=True)
