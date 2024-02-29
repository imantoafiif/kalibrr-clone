import { configureStore } from '@reduxjs/toolkit'
import sessionSlice from './reducers/sessionSlice'

export default configureStore({
  reducer: {
    session: sessionSlice
  },
})