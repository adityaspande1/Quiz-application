
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import "./App.css"
import UserDashboard from "./pages/UserDashboard"
import { AuthProvider } from "./context/AuthContext"
import AdminDashboard from "./pages/AdminDashboard"

function App() {
  return (
    <AuthProvider>
      <Router>
      <div className="min-h-screen bg-gray-100">

        <nav className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between">
              <div className="flex space-x-7">
                <div>
                  <Link to="/" className="flex items-center py-4 px-2">
                    <span className="font-semibold text-gray-500 text-lg">QuizMaster</span>
                  </Link>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  to="/login"
                  className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<UserDashboard/>}/>
          <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  )
}

export default App

