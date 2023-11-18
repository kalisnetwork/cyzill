import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/user/userSlice'; // Import your logout action

const Logout = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        // Dispatch the logout action here
        dispatch(logout());
        // Add logic for any further actions after logout if needed
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
};

export default Logout;
