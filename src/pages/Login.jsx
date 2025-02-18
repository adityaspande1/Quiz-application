import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Login() {
  const navigate = useNavigate();

    

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Signing in...</h3>
      </div>
    </div>
  );
}

export default Login;
