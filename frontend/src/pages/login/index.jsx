import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, LogIn } from 'lucide-react';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const config = { headers: { 'Content-Type': 'application/json' } };

            const { data } = await axios.post(
                "http://localhost:5003/api/users/login",
                { email, password },
                config
            );

            onLogin(data);
            navigate("/");
        } catch (error) {
            console.error("Login failed:", error);
            alert("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-white text-gray-700">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Login to FinVerse</h2>
                <form onSubmit={handleLogin} className="space-y-6">
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
                        <LogIn size={18} />
                        {loading ? "Logging In..." : "Log In"}
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-500">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
