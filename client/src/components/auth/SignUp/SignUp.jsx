import React, { useState, useEffect } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import OauthLogin from '../oauth/OauthLogin';

const SignUp = () => {
    const navigate = useNavigate()
    const [state, setState] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false,
        error: null,
        passwordErrors: {
            length: true,
            lowercase: true,
            uppercase: true,
            number: true,
            specialChar: true,
        },
        showPasswordSuggestions: false,
    });
    useEffect(() => {
        setState(prevState => ({
            ...prevState,
            phoneNumber: '',
            password: '',
            passwordErrors: {
                length: true,
                lowercase: true,
                uppercase: true,
                number: true,
                specialChar: true,
            },
            phoneNumberError: false,
            passwordsMatch: true,
        }));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: state.username,
                    email: state.email,
                    phoneNumber: state.phoneNumber,
                    password: state.password,
                    termsAccepted: state.termsAccepted ? 'ok' : '',
                }),
            });

            if (response.ok) {
                setState(prevState => ({ ...prevState, error: 'User created successfully!' }));
                navigate('/verification');
            } else {
                const errorData = await response.json();
                setState(prevState => ({ ...prevState, error: errorData.message || 'Registration failed.' }));
            }
        } catch (error) {
            setState(prevState => ({ ...prevState, error: 'An error occurred. Please try again.' }));
        }
    };
    const handleConfirmPasswordChange = (event) => {
        const confirmPassword = event.target.value;
        setState(prevState => ({
            ...prevState,
            confirmPassword,
            passwordsMatch: confirmPassword === prevState.password,
        }));
    }
    const handlePasswordChange = (event) => {
        // Reset password error messages when the user starts typing
        setState(prevState => ({
            ...prevState,
            passwordErrors: {
                length: true,
                lowercase: true,
                uppercase: true,
                number: true,
                specialChar: true,
            },
            showPasswordSuggestions: true,
            passwordSuggestions: [],
        }));

        const password = event.target.value;
        const newSuggestions = [];

        if (!validateLength(password)) {
            newSuggestions.push('At least 8 characters');
        }
        if (!validateLowercase(password)) {
            newSuggestions.push('At least one lowercase letter');
        }
        if (!validateUppercase(password)) {
            newSuggestions.push('At least one uppercase letter');
        }
        if (!validateNumber(password)) {
            newSuggestions.push('At least one number');
        }
        if (!validateSpecialChar(password)) {
            newSuggestions.push('At least one special character');
        }

        setState(prevState => ({
            ...prevState,
            password,
            passwordErrors: {
                length: !validateLength(password),
                lowercase: !validateLowercase(password),
                uppercase: !validateUppercase(password),
                number: !validateNumber(password),
                specialChar: !validateSpecialChar(password),
            },
            passwordSuggestions: newSuggestions,
        }));
    }

    const validateLength = (password) => {
        return password.length >= 8;
    }
    const validateLowercase = (password) => {
        return /[a-z]/.test(password);
    }
    const validateUppercase = (password) => {
        return /[A-Z]/.test(password);
    }
    const validateNumber = (password) => {
        return /\d/.test(password)
    }
    const validateSpecialChar = (password) => {
        return /[^A-Za-z0-9]/.test(password);
    }
    const handlePhoneNumberChange = (event) => {
        const phoneNumber = event.target.value;
        if (phoneNumber.trim() !== '') {
            setState(prevState => ({
                ...prevState,
                phoneNumber: phoneNumber,
                phoneNumberError: !validatePhoneNumber(phoneNumber),
            }));
        } else {
            console.error('Phone number cannot be null or empty');
        }
    }
    const validatePhoneNumber = (phoneNumber) => {
        const phoneNumberRegex = /^[6789]\d{9}$/;
        return phoneNumberRegex.test(phoneNumber);
    }
    const { passwordsMatch, error, passwordErrors } = state;

    return (
        <>
            <main className="min-h-screen flex">
                <div className="flex-1 flex items-center justify-center">
                    <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
                        <div className="">
                            <div className="mt-5 space-y-2">
                                <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Sign up</h3>
                                <p className="">
                                    Already have an account? <Link to={'/login'} className="font-medium text-indigo-600 hover:text-indigo-500">Log in</Link >
                                </p>
                            </div>
                        </div>
                        <OauthLogin />
                        <div className="relative">
                            <span className="block w-full h-px bg-gray-300"></span>
                            <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">or</p>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="font-medium">Name</label>
                                <input
                                    id='username'
                                    type="text"
                                    required
                                    value={state.username}
                                    onChange={e => setState(prevState => ({ ...prevState, username: e.target.value.trim() }))}
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="font-medium">Phone Number</label>
                                <input
                                    type="tel" id="phoneNumber" placeholder='9876543210' name="phoneNumber" required onChange={handlePhoneNumberChange}
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                                {state.phoneNumberError && <div className='invalid'>Invalid phone number</div>}
                            </div>
                            <div>
                                <label className="font-medium">Email</label>
                                <input
                                    id='email'
                                    type="email"
                                    required
                                    value={state.email}
                                    onChange={e => setState(prevState => ({ ...prevState, email: e.target.value.trim() }))}
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="font-medium">Password</label>
                                <input
                                    id='password'
                                    type="password"
                                    required
                                    value={state.password}
                                    onChange={handlePasswordChange}
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                                {state.showPasswordSuggestions && (
                                    <ul>
                                        {state.passwordSuggestions.map((suggestion, index) => (
                                            <li key={index} className={passwordErrors[suggestion] ? 'valid' : 'invalid'}>{suggestion}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div>
                                <label className="font-medium">Confirm Password</label>
                                <input
                                    type="password" id="confirmPassword" name="confirmPassword" required onChange={handleConfirmPasswordChange}
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                                {!passwordsMatch && <div className='invalid'>Passwords do not match</div>}
                            </div>

                            <div className='termsandconditions-field'>
                                <div className="termsandconditions">
                                    <input
                                        type='checkbox'
                                        id='termsAccepted'
                                        name='termsAccepted'
                                        required
                                        onChange={e => setState(prevState => ({ ...prevState, termsAccepted: e.target.checked }))}
                                    />
                                    <label htmlFor='termsAccepted'>Clicking this, you agree to our terms and conditions.</label>

                                </div>
                            </div>
                            {error && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
                                    <p>{error}</p>
                                </div>
                            )}
                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                            >
                                Create account
                            </button>
                        </form>
                    </div>
                </div>
                <div className="relative flex-1 hidden items-center justify-center bg-slate-300 h-screen lg:flex" style={{ height: '128vh' }}>
                    <div className="relative z-10 w-full max-w-md">
                        <img src="/house.png" className="w-full" draggable={false} alt="House" />
                        <div className="mt-16 space-y-3">
                            <h3 className="text-black text-3xl font-bold">Start growing your business quickly</h3>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default SignUp;