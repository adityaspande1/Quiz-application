import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../services/firebase";
function Signup() {
  const navigate = useNavigate();

  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle Email/Password Signup
  const handleEmailSignup = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User created:", userCredential.user);
        navigate("/dashboard"); // Navigate after signup
      })
      .catch((error) => {
        console.error("Error signing up:", error.message);
      });
  };

  // Handle Google Signup
  const handleGoogleSignup = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Google sign-in user:", result.user);
        if(result.isAdmin){
          
        }
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error during Google sign-in:", error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Sign Up</h3>

        {/* Email/Password Signup Form */}
        <form onSubmit={handleEmailSignup}>
          <div className="mt-4">
            <label className="block">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mt-4">
            <label className="block">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex items-center justify-center mt-4">
            <button
              type="submit"
              className="px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-900"
            >
              Sign Up with Email
            </button>
          </div>
        </form>

        {/* Google Signup Button */}
        <div className="flex items-center justify-center mt-4">
          <button
            onClick={handleGoogleSignup}
            className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
          >
            Sign Up with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
