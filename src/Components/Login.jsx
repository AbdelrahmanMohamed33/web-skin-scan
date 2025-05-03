import { saveToken } from '../Helper/Tokens';
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Domain from "../constants/Domain";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState([]);
    const [loading, setLoading] = useState(false); // Start as false
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setErrorMessage(['Email and password are required.']);
            return;
        }

        setLoading(true); // Start loading

        try {
            const response = await axios.post(`${Domain.apiUrl()}/api/Auth/auth/login`, {
                email,
                password,
            });
            if (response.status === 200) {
                saveToken("access", response.data.data.access);
                saveToken("refresh", response.data.data.refresh);
                setEmail("");
                setPassword("");
                setErrorMessage([]);
                navigate('/');
                window.location.reload();
            }
        } catch (error) {
            setErrorMessage([error.response?.data?.data?.message || 'Login failed. Please check your credentials.']);
            setLoading(false); // Stop loading on error
        }
    };

    return (
        <div className="container mx-auto p-4 pt-20">
            <h1 className="text-4xl font-semibold text-center text-blue-800 mb-8">Login</h1>
            <h2 className="text-2xl text-center mb-4">Welcome Back!</h2>

            {loading ? (
                <div className="flex flex-col justify-center items-center py-12 space-y-4">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-700 font-medium">Logging please wait...</p>
              </div>
              
            ) : (
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errorMessage.length > 0 ? 'border-red-500' : ''}`}
                            placeholder="Email"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errorMessage.length > 0 ? 'border-red-500' : ''}`}
                            placeholder="Password"
                        />
                    </div>

                    {/* Error Message */}
                    {errorMessage.length > 0 && (
                        <div className="mb-6 text-red-500">
                            <ul>
                                {errorMessage.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Forgot Password Link */}
                    <p className="text-right mb-4">
                        <Link to="/forgot-password" className="text-blue-700 hover:underline">
                            Forgot Password?
                        </Link>
                    </p>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    >
                        Login
                    </button>
                </form>
            )}

            {/* Links */}
            {!loading && (
                <p className="text-center">
                    Don't have an account? <Link to="/register" className="text-blue-700 hover:underline">Register here</Link>
                </p>
            )}
        </div>
    );
};

export default Login;
