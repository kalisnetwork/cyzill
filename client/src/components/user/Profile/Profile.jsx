import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserProfile, updateUserProfile, deleteUserProfile } from '../../../actions/userActions.js';

const Profile = () => {
    const { currentUser } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [username, setUsername] = useState(currentUser.username);
    const [email, setEmail] = useState(currentUser.email);
    const [phoneNumber, setPhoneNumber] = useState(currentUser.phoneNumber);
    const [photo, setPhoto] = useState(currentUser?.others?.photo || currentUser?.photo);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    useEffect(() => {
        // Fetch user profile when the component mounts
        dispatch(fetchUserProfile());
    }, [dispatch]);

    const handleUpdateProfile = () => {
        // Update user profile
        dispatch(updateUserProfile({ username, email, phoneNumber, photo }));
    };

    const handleDeleteProfile = () => {
        // Delete user profile
        dispatch(deleteUserProfile());
    };

    const handleUpdatePassword = () => {
        // Handle password update logic here
        // Validate the passwords and perform password update
        if (newPassword === confirmPassword) {
            // Dispatch action to update password or perform necessary logic
            console.log('Updating password...');
        } else {
            console.log('New password and confirm password do not match.');
        }
    };

    if (!currentUser) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
            <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
                <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
                    <h2 className="pl-3 mb-4 text-2xl font-semibold">Settings</h2>
                    <Link to="/public-profile" className="flex items-center px-3 py-2.5 font-bold bg-white text-indigo-900 border rounded-full">
                        Profile Settings
                    </Link>
                    <Link to="/account-settings" className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full">
                        Account Settings
                    </Link>
                    <Link to="/password-settings" className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full">
                        Password Settings
                    </Link>
                </div>
            </aside>
            <main className="w-full min-h-screen p-4 md:w-2/3 lg:w-3/4">
                <h2 className="text-xl font-bold">Public Profile</h2>
                <div className="flex flex-col items-center mt-8 space-y-5">
                    <img className="w-40 h-40 rounded-full" src={photo} alt="Avatar" />
                    <button onClick={() => setPhoto(prompt('Enter new photo URL'))} className="py-3 px-7 text-base font-medium bg-gray-200 rounded-lg">Change picture</button>
                    <button onClick={handleDeleteProfile} className="py-3 px-7 text-base font-medium bg-gray-200 rounded-lg">Delete picture</button>
                </div>
                <div className="flex flex-col items-center w-full mt-8 space-y-2">
                    <div className="w-full">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium">Your username</label>
                        <input type="text" id="username" className="w-full p-2 rounded-lg" placeholder="Your username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="w-full">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</label>
                        <input type="email" id="email" className="w-full p-2 rounded-lg" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="w-full">
                        <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium">Your phone number</label>
                        <input type="tel" id="phoneNumber" className="w-full p-2 rounded-lg" placeholder="Your phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                    </div>
                    <Link to="#" onClick={handleUpdateProfile} className="py-3 px-7 text-base font-medium bg-gray-200 rounded-lg mt-4">Update Profile</Link>
                </div>
                <div className="w-full min-h-screen p-4">
                    <h2 className="text-xl font-bold">Password Settings</h2>
                    <div className="flex flex-col items-center w-full mt-8 space-y-2">
                        <div className="w-full">
                            <label htmlFor="currentPassword" className="block mb-2 text-sm font-medium">Current Password</label>
                            <input type="password" id="currentPassword" className="w-full p-2 rounded-lg" placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
                        </div>
                        <div className="w-full">
                            <label htmlFor="newPassword" className="block mb-2 text-sm font-medium">New Password</label>
                            <input type="password" id="newPassword" className="w-full p-2 rounded-lg" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                        </div>
                        <div className="w-full">
                            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium">Confirm Password</label>
                            <input type="password" id="confirmPassword" className="w-full p-2 rounded-lg" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        </div>
                        <button onClick={handleUpdatePassword} className="py-3 px-7 text-base font-medium bg-gray-200 rounded-lg mt-4">Update Password</button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Profile;
