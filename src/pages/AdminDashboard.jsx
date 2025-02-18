
import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { createQuiz, getQuizzes } from "../services/quizService"

export default function AdminDashboard() {
  const { user} = useAuth()
  const [quizzes, setQuizzes] = useState([])
  const [newQuiz, setNewQuiz] = useState({
    title: "",
    questions: [
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
      },
    ],
  })

  useEffect(() => {
    const fetchQuizzes = async () => {
      const data = await getQuizzes()
      setQuizzes(data)
    }
    fetchQuizzes()
  }, [])

  const handleCreateQuiz = async (e) => {
    e.preventDefault()
    try {
      await createQuiz(newQuiz)
      setNewQuiz({
        title: "",
        questions: [{ question: "", options: ["", "", "", ""], correctAnswer: 0 }],
      })
      // Refresh quizzes list
      const updatedQuizzes = await getQuizzes()
      setQuizzes(updatedQuizzes)
    } catch (error) {
      console.error("Error creating quiz:", error)
    }
  }

  const addQuestion = () => {
    setNewQuiz({
      ...newQuiz,
      questions: [...newQuiz.questions, { question: "", options: ["", "", "", ""], correctAnswer: 0 }],
    })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Create New Quiz</h2>
        <form onSubmit={handleCreateQuiz} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Quiz Title</label>
            <input
              type="text"
              value={newQuiz.title}
              onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {newQuiz.questions.map((q, qIndex) => (
            <div key={qIndex} className="border p-4 rounded">
              <h3 className="font-medium mb-2">Question {qIndex + 1}</h3>
              <input
                type="text"
                value={q.question}
                onChange={(e) => {
                  const updatedQuestions = [...newQuiz.questions]
                  updatedQuestions[qIndex].question = e.target.value
                  setNewQuiz({ ...newQuiz, questions: updatedQuestions })
                }}
                className="w-full p-2 border rounded mb-2"
                placeholder="Enter question"
                required
              />

              {q.options.map((option, oIndex) => (
                <div key={oIndex} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const updatedQuestions = [...newQuiz.questions]
                      updatedQuestions[qIndex].options[oIndex] = e.target.value
                      setNewQuiz({ ...newQuiz, questions: updatedQuestions })
                    }}
                    className="flex-1 p-2 border rounded"
                    placeholder={`Option ${oIndex + 1}`}
                    required
                  />
                  <input
                    type="radio"
                    name={`correct-${qIndex}`}
                    checked={q.correctAnswer === oIndex}
                    onChange={() => {
                      const updatedQuestions = [...newQuiz.questions]
                      updatedQuestions[qIndex].correctAnswer = oIndex
                      setNewQuiz({ ...newQuiz, questions: updatedQuestions })
                    }}
                  />
                </div>
              ))}
            </div>
          ))}

          <button type="button" onClick={addQuestion} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
            Add Question
          </button>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Create Quiz
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Existing Quizzes</h2>
        <div className="space-y-4">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="border p-4 rounded">
              <h3 className="font-medium">{quiz.title}</h3>
              <p className="text-sm text-gray-600">{quiz.questions.length} questions</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

