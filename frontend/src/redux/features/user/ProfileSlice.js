import { createSlice } from '@reduxjs/toolkit';

const showProfileSlice = createSlice({
    name: 'showProfile',
    initialState: {
        isVisible: false
    },
    reducers: {
        showProfile(state) {
            state.isVisible = true;
        },
        closeProfile(state) {
            state.isVisible = false;
        },
    },
});

// Export actions
export const { showProfile, closeProfile} = showProfileSlice.actions;

// Export reducer
export default showProfileSlice.reducer;
