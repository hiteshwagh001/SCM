import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null, // User details will be stored here
    isAuthenticated: false, // Authentication status
    status: 'idle', // For tracking status (e.g., 'loading', 'succeeded', 'failed')
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccess(state, action) {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.status = 'succeeded';
        },
        logoutSuccess(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.status = 'idle';
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
    },
});

export const { loginSuccess, logoutSuccess, setStatus } = userSlice.actions;
export default userSlice.reducer;
