// userActions.js

import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'http://localhost:5000/api/user';

export const fetchUserProfile = createAsyncThunk('user/fetchProfile', async () => {
    const response = await fetch(`${BASE_URL}/profile`);
    const data = await response.json();
    return data;
});

export const updateUserProfile = createAsyncThunk('user/updateProfile', async (updatedData) => {
    const response = await fetch(`${BASE_URL}/profile`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    });
    const data = await response.json();
    return data;
});

export const deleteUserProfile = createAsyncThunk('user/deleteProfile', async () => {
    const response = await fetch(`${BASE_URL}/profile`, {
        method: 'DELETE',
    });
    const data = await response.json();
    return data;
});
