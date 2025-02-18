function Home() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-6xl font-bold">
            Welcome to <span className="text-green-600">QuizMaster</span>
          </h1>
          <p className="mt-3 text-2xl">
            Test your knowledge with our exciting quizzes!
          </p>
        </main>
      </div>
    );
  }
  
  export default Home;
  