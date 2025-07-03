import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { saveToken } from '../Helper/Tokens';
import Domain from "../constants/Domain";

const Register = () => {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false); // ✅ Add loading state
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        setLoading(true); // ✅ Start loading

        try {
            const body = {
                'FullName': fullName,
                'email': email,
                'password': password,
                'confirmPassword': confirmPassword
            };
            const response = await axios.post(`${Domain.apiUrl()}/api/Auth/auth/register`, body);
            if (response.status === 200) {
                saveToken("access", response.data.data.access);
                saveToken("refresh", response.data.data.refresh);
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setFullName("");
                setErrorMessage('');
                navigate('/');
                window.location.reload();
            } else {
                setErrorMessage('Registration failed. Please try again.');
            }
        } catch (error) {
            setErrorMessage('Registration failed. Please try again.');
        }

        setLoading(false); // ✅ Stop loading
    };

    return (
        <div className="container mx-auto p-4 pt-24">
            <h1 className="text-4xl font-semibold text-center text-blue-800 mb-8">Register</h1>
            <h2 className="text-2xl text-center mb-4">Create Your New Account</h2>

            {loading ? (
                <div className="flex flex-col justify-center items-center py-12 space-y-4 p-16">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-700 font-medium mb-16">Registering, please wait...</p>
                </div>
            ) : (
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Full Name"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Email"
                        />
                    </div>

                    <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Password"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Password must contain at least one 'A,b,#,123' and it must be strong..
                    </p>
                </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Confirm Password"
                        />
                    </div>

                    {errorMessage && <p className="text-red-500 text-xs italic mb-4">{errorMessage}</p>}

                    <button
                        type="submit"
                        className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    >
                        Register
                    </button>
                </form>
            )}

            {!loading && (
                <p className="text-center">
                    Already have an account? <Link to="/login" className="text-blue-700 hover:underline">Login here</Link>
                </p>
            )}
        </div>
    );
};

export default Register;
