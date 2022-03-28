import {createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'currentUser',
    initialState: {
        isAuthenticated: false,
        userInfo: {}
    },
    reducers: {
        addCurrentUser: (state, action) => {
            state.isAuthenticated = !!Object.keys(action.payload.userInfo).length
            state.userInfo = action.payload.userInfo
        },
        removeCurrentUser: (state)=>{
            state = {}
        }
    }
})

export const {addCurrentUser, removeCurrentUser} = userSlice.actions
export default userSlice.reducer