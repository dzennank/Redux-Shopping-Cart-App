import { createSlice } from "@reduxjs/toolkit";

const options = {
    name: 'ui',
    initialState: { notification: null },
    reducers: {
        showNotification(state, action) {
            state.notification = {
                message: action.payload.message,
                type: action.payload.type,
                open: action.payload.open
            }
        }
    }
}

const uiSlice = createSlice(options)
export const uiActions = uiSlice.actions;

export default uiSlice 