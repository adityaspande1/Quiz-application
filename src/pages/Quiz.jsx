

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"


export default function Quiz() {
  const { quizId } = useParams()
  const { user } = useAuth()
  const [quiz, setQuiz] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    const fetchQuiz = async () => {
      const quizzes = await getQuizzes()
      const currentQuiz = quizzes.find((q) => q.id === quizId)
      setQuiz(currentQuiz)
    }
    fetchQuiz()
  }, [quizId])

  useEffect(() => {
    if (!quiz || isFinished) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNextQuestion()
          return 30
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [quiz, isFinished])

  const handleNextQuestion = async () => {
    if (selectedAnswer === quiz.questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    if (currentQuestion + 1 < quiz.questions.length) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setTimeLeft(30)
    } else {
      setIsFinished(true)
      await saveQuizScore(user.uid, quizId, score)
    }
  }

  if (!quiz) return <div>Loading...</div>

  if (isFinished) {
    return (
      <div className="container mx-auto p-4 max-w-lg">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-xl mb-4">
            Your score: {score} out of {quiz.questions.length}
          </p>
          <p className="text-lg mb-4">Percentage: {((score / quiz.questions.length) * 100).toFixed(2)}%</p>
          <a href="/dashboard" className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Back to Dashboard
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Question {currentQuestion + 1} of {quiz.questions.length}
          </h2>
          <div className="text-lg font-medium">Time: {timeLeft}s</div>
        </div>

        <div className="mb-6">
          <p className="text-lg mb-4">{quiz.questions[currentQuestion].question}</p>

          <div className="space-y-2">
            {quiz.questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedAnswer(index)}
                className={`w-full p-3 text-left rounded ${
                  selectedAnswer === index ? "bg-blue-100 border-blue-500" : "bg-gray-50 hover:bg-gray-100"
                } border`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleNextQuestion}
          disabled={selectedAnswer === null}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {currentQuestion + 1 === quiz.questions.length ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  )
}

