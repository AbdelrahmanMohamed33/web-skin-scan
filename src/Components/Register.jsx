import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { saveToken } from '../Helper/Tokens';
import Domain from "../constants/Domain";
import imgDoc from "../assets/img/doc-Reg.jpg";
import imgUser from "../assets/img/User.jpg";
const Register = () => {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showRoleModal, setShowRoleModal] = useState(false); // 🔹 Role Modal State
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }
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
                setShowRoleModal(true); // 🔹 Show role selection modal after registration
            } else {
                setErrorMessage('Registration failed. Please try again.');
            }
        } catch (error) {
            setErrorMessage('Registration failed. Please try again.');
        }
    };

    // 🔹 Handle Role Selection
    const handleRoleSelect = (role) => {
        if (role === "doctor") {
            navigate('/DoctorDetails');
        } else {
            navigate('/');
        }
        window.location.reload();
    };

    return (
        <div className="container mx-auto p-4 pt-20">
            <h1 className="text-4xl font-semibold text-center text-blue-800 mb-8">Register</h1>
            <h2 className="text-2xl text-center mb-4">Create Your New Account</h2>

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

            <p className="text-center">
                Already have an account? <Link to="/login" className="text-blue-700 hover:underline">Login here</Link>
            </p>

            {/* 🔹 Role Selection Modal */}
            {showRoleModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg text-center">
                        <h2 className="text-xl font-bold mb-4">Register as a</h2>
                        <div className="flex justify-center gap-6">
                            <button
                                onClick={() => handleRoleSelect("doctor")}
                                className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-200"
                            >
                                <img src={imgDoc} alt="Doctor" className="w-16 h-16 rounded-lg" />
                                <span className="mt-2">Doctor</span>
                            </button>
                            <button
                                onClick={() => handleRoleSelect("user")}
                                className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-200"
                            >
                                <img src={imgUser} alt="User" className="w-16 h-16 rounded-lg" />
                                <span className="mt-2">Patient</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register;
