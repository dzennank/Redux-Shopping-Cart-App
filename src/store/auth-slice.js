import { createSlice } from '@reduxjs/toolkit';


const options = {
    name: 'auth',
    initialState: { isLoggedIn: false },
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
        },
    }
}

const authSlice = createSlice(options)

export const authActions = authSlice.actions;
export default authSlice;