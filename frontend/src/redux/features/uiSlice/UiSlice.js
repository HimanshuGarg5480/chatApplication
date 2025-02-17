import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isNotificationVisible: false,
        isSearchVisible: false,
    },
    reducers: {
        toggleNotification: (state) => {
            state.isSearchVisible = false;
            state.isNotificationVisible = !state.isNotificationVisible;
        },
        toggleSearch: (state) => {
            state.isNotificationVisible = false;
            state.isSearchVisible = !state.isSearchVisible;
        },
    },
});

export const { toggleNotification, toggleSearch } = uiSlice.actions;

export default uiSlice.reducer;
