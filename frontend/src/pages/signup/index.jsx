import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { User, Mail, Lock, UserPlus } from "lucide-react";

const Signup = ({ onLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        "http://localhost:5003/api/users",
        { name, pic, email, password },
        config
      );

      onLogin(data); // Call onLogin to update user state in App
      navigate("/"); // Redirect to homepage
    } catch (error) {
      console.log(error);
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-white text-gray-700">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Join FinVerse</h2>
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm text-gray-600 mb-1">Name</label>
            <div className="relative">
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 pl-10 bg-gray-50 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <User className="absolute left-3 top-2.5 text-blue-400" size={18} />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm text-gray-600 mb-1">Email</label>
            <div className="relative">
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 pl-10 bg-gray-50 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Mail className="absolute left-3 top-2.5 text-blue-400" size={18} />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-gray-600 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 pl-10 bg-gray-50 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Lock className="absolute left-3 top-2.5 text-blue-400" size={18} />
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
            disabled={loading}
          >
            <UserPlus size={18} />
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
