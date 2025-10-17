// AuthForm Component
// Handles:
// Admin Login & Registration
// JWT-based authentication
// Redirects user to Dashboard after login


import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // fetching the data from the backend og admin registration
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      const data = await res.json();
      setMessage(data.message);

      //navigating to the page after register
      if (res.ok) {
        localStorage.setItem("username", username);
        navigate("/Addagent");
      }
    } catch (err) {
      console.error(err);
    }
  };

  //Handle admin login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();
      setMessage(data.message);

      if (res.ok) {
        // Save auth data locally for session management
        localStorage.setItem("email", email);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("token", data.token);
        navigate("/Addagent");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-[#0E1221]  min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm bg-transparent p-6 text-center animate-fadeIn">
        
        {/*login/registration form */}
        <form onSubmit={isLogin ? handleLogin : handleRegister}>
          <h3 className="text-left text-sm text-white mb-2">Email</h3>
          <input
            type="email"
            placeholder="Type your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 mb-4 border border-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-[#432534]"
          />

          <h3 className="text-left text-sm text-white mb-2">Password</h3>
          <input
            type="password"
            placeholder="Type your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 mb-4 border border-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-[#432534]"
          />

          <button
            type="submit"
            className="w-full bg-white text-[#0E1221] font-semibold py-2 rounded-md transition duration-300 hover:bg-[#e8e8e8]"
          >
            {isLogin ? "Login" : "Sign up"}
          </button>
        </form>

        {/*  Status Message */}
        <p className="mt-3 text-green-500 text-sm">{message}</p>

        {/*  Toggle between Login/Register */}
        <button
          className="mt-4 bg-transparent text-white text-sm hover:underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span className="underline">{isLogin ? "Sign up" : "Login"}</span>
        </button>
      </div>
    </div>
  );
}

export default AuthForm;
