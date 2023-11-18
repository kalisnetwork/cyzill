// OauthLogin.jsx

import React, { useEffect, useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { app } from '../../../firebase.js';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from '../../../redux/user/userSlice.js';

const OauthLogin = () => {
    const dispatch = useDispatch();
    const auth = getAuth(app);
    const providerGoogle = new GoogleAuthProvider();
    const [loading, setLoading] = useState(true);

    const handleLoginGoogle = () => {
        signInWithRedirect(auth, providerGoogle)
            .catch(error => {
                dispatch(loginFailure(error)); // Dispatch login failure with error
            });
    };

    useEffect(() => {
        getRedirectResult(auth)
            .then((result) => {
                if (result && result.user) {
                    // Handle user data here and dispatch loginSuccess action
                    const userData = {
                        name: result.user.displayName,
                        email: result.user.email,
                        photo: result.user.photoURL,
                    };
                    dispatch(loginSuccess(userData));
                    // Redirect to appropriate page after successful login
                    // Example: window.location.href = '/dashboard';
                }
                setLoading(false);
            })
            .catch((error) => {
                console.log('could not sign in', error);
                setLoading(false);
            });
    }, [auth, dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <button type='button' onClick={handleLoginGoogle}>Sign in with Google</button>
        </div>
    );
};

export default OauthLogin;
