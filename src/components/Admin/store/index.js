import { configureStore } from '@reduxjs/toolkit'
import currentUser from './features/currentUser'

export default configureStore({
    reducer: {
        currentUser
    },
})