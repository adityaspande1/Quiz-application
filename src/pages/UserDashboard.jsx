

import { useState, useEffect } from "react"
import { getQuizzes } from "../services/quizService"
import { useAuth } from "../context/AuthContext"
export default function UserDashboard() {
  const { user } = useAuth()
  const [quizzes, setQuizzes] = useState([])

  useEffect(() => {
    const fetchQuizzes = async () => {
      const data = await getQuizzes()
      setQuizzes(data)
    }
    fetchQuizzes()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Available Quizzes</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
            <p className="text-gray-600 mb-4">{quiz.questions.length} questions</p>
            <a
              href={`/quiz/${quiz.id}`}
              className="block w-full bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700"
            >
              Start Quiz
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

