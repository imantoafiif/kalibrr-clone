import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
    session: localStorage.getItem('user-session') || null,
    user: null,
    isLoggedIn: false,
}

const sessionSlice = createSlice({
    name: 'user-session',
    initialState,
    reducers: {
        setLocalSession: (state, action) => {
            localStorage.setItem('user-session', action.payload)
            state.session = action.payload
            state.isLoggedIn = true
            state.user = jwtDecode(action.payload)
        },
        destroyLocalSession: state => {
            state.session = null
            state.user = null
            state.isLoggedIn = false
            localStorage.removeItem('user-session')
        }
    },
})

export const { setLocalSession, destroyLocalSession } = sessionSlice.actions

export default sessionSlice.reducer