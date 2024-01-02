import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


import { loginStart, loginSuccess, loginFailure } from '../../../redux/user/userSlice';
import OauthLogin from '../oauth/OauthLogin';

const Login = () => {
    const navigate = useNavigate()
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!identifier || !password) { // check if identifier and password are provided
            setError('Please provide both email/phone number and password.');
            return;
        }

        try {
            setLoading(true);
            dispatch(loginStart());
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ identifier, password }), // send identifier and password
            });

            const data = await response.json();
            if (response.ok) {
                setUser(data);
                dispatch(loginSuccess(data));
                navigate('/');
            } else {
                switch (response.status) {
                    case 401:
                        setError('Invalid email/phone number or password.');
                        break;
                    case 500:
                        setError('Server error. Please try again later.');
                        break;
                    default:
                        setError('Login failed.');
                }
                dispatch(loginFailure(error));
            }
        } catch (error) {
            setError(error.message || 'Login failed.');
            dispatch(loginFailure(error.message || 'Login failed.'));
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <main className="min-h-screen flex">
                <div className="relative flex-1 hidden items-center justify-center bg-slate-300 h-screen lg:flex">
                    <div className="relative z-10 w-full max-w-md">
                        <img src="/login-house.png" className="w-full" draggable={false} alt="House" />
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-center h-screen">
                    <div className="w-full max-w-md space-y-6 text-gray-600 sm:px-4">
                        <div className="text-center">
                            <div className="mt-5 space-y-2">
                                <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Log in to your account</h3>
                                <p className="">
                                    Don't have an account? <Link to={'/signup'} className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</Link>
                                </p>
                            </div>
                        </div>
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
                                <p>{error}</p>
                            </div>
                        )}
                        <OauthLogin />
                        <div className="relative">
                            <span className="block w-full h-px bg-gray-300"></span>
                            <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">or</p>
                        </div>
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="identifier">Enter your email or phone</label>
                                <input type="text" id="identifier" name="identifier" placeholder='' required onChange={(e) => setIdentifier(e.target.value)} className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" aria-label="Email Address or Phone Number" />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)} className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" aria-label="Password" />
                            </div>
                            <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150" type="submit" disabled={loading}>
                                {loading ? 'Loading...' : 'Log In'}
                            </button>
                        </form>
                        <div className="forgot-password font-medium">
                            <p className="login-action-text">Forgot password? <Link to="/reset-password" className="font-medium text-indigo-600 hover:text-indigo-500">Reset it here</Link></p>
                        </div>
                    </div>
                </div>

            </main>
        </>
    );
};

export default Login;
