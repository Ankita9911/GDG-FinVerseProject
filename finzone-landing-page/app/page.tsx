import { GameCard } from "@/components/game-card"

export default function Home() {
  const games = [
    {
      id: "quiz-game",
      title: "Finance Quiz Game",
      description: "Test your financial knowledge with our interactive quiz!",
      imageUrl: "https://api.triviacreator.com/v1/imgs/quiz/FLAG%20QUIZ%20(3)-e9bd6d81-05be-468a-b419-71ec204f8ef6.png",
      status: "live",
      link: "https://v0-new-project-omjmaa8eun4-esp7hr.vercel.app/",
    },
    {
      id: "dream-life-builder",
      title: "Dream Life Builder",
      description: "Build your dream life while learning financial planning",
      imageUrl: "https://www.wikihow.com/images/thumb/6/6d/Set-up-and-Play-the-Game-of-Life-Step-16-Version-2.jpg/v4-460px-Set-up-and-Play-the-Game-of-Life-Step-16-Version-2.jpg",
      status: "coming-soon",
    },
    {
      id: "finance-royale",
      title: "The Budget Game",
      description: "Compete with others in this financial battle royale",
      imageUrl: "https://natwest.mymoneysense.com/media/2583/12_16_budget_game_seo_1200_630.jpg",
      status: "coming-soon",
    },
  ]

  const quizzes = [
    {
      id: "quiz-1",
      title: "Beginner Finance Quiz",
      description: "Start your journey with basic finance questions",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
      status: "live",
      link: "/quiz-game",
    },
    {
      id: "quiz-2",
      title: "Intermediate Finance Quiz",
      description: "Challenge yourself with more complex topics",
      imageUrl: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?q=80&w=2070&auto=format&fit=crop",
      status: "coming-soon",
    },
    {
      id: "quiz-3",
      title: "Advanced Finance Quiz",
      description: "Only for the brave! Test your deep finance knowledge",
      imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop",
      status: "coming-soon",
    },
  ]

  const podcasts = [
    {
      id: "podcast-1",
      title: "Money Talks",
      description: "Weekly insights into smart money habits",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTovronzo-YMZhdGmOwNRre8spuP976YU909A&s",
      status: "live",
    },
    {
      id: "podcast-2",
      title: "Investor Hour",
      description: "Deep dives into stock markets and wealth creation",
      imageUrl: "https://t3.ftcdn.net/jpg/07/69/42/10/360_F_769421019_64XaeejnlW5pwQwdiNKuH7GD7lYJZLte.jpg",
      status: "coming-soon",
    },
    {
      id: "podcast-3",
      title: "Crypto & Chill",
      description: "Decode crypto in easy language",
      imageUrl: "https://variety.com/wp-content/uploads/2021/12/Bitcoin-Cryptocurrency-Placeholder.jpg?w=1000&h=563&crop=1",
      status: "coming-soon",
    },
  ]

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-purple-100 via-purple-50 to-white">
  <a
    href="https://my-app-im5d-ankitas-projects-ceef2db6.vercel.app/"
    className="absolute top-4 left-4 bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
  >
    Home
  </a>
      <div className="container mx-auto px-4 py-16">
        {/* Landing Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#800080] mb-4 animate-fade-in">
  Welcome to FinZone
</h1>
<p className="text-xl text-[#800080] max-w-2xl mx-auto">
  Fun and educational finance games to boost your financial literacy
</p>

        </header>

        {/* Games Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold text-[#800080] mb-8 text-center">🎮 Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game) => (
              <GameCard
                key={game.id}
                title={game.title}
                description={game.description}
                imageUrl={game.imageUrl}
                status={game.status}
                link={game.link}
              />
            ))}
          </div>
        </section>

        {/* Quizzes Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold text-[#800080] mb-8 text-center">🧠 Quizzes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quizzes.map((quiz) => (
              <GameCard
                key={quiz.id}
                title={quiz.title}
                description={quiz.description}
                imageUrl={quiz.imageUrl}
                status={quiz.status}
                link={quiz.link}
              />
            ))}
          </div>
        </section>

        {/* Podcasts Section */}
        <section>
          <h2 className="text-3xl font-semibold text-[#800080] mb-8 text-center">🎧 Podcasts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {podcasts.map((podcast) => (
              <GameCard
                key={podcast.id}
                title={podcast.title}
                description={podcast.description}
                imageUrl={podcast.imageUrl}
                status={podcast.status}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

