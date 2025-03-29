import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md p-6 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
                <p className="mb-4 text-gray-600">
                    Enter your email address below, and we will send you a link to reset your password.
                </p>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            required
                            className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded">
                        Send Reset Link
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Remembered your password? 
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;