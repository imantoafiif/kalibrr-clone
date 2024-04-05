import { configureStore } from '@reduxjs/toolkit'
import sessionSlice from './reducers/sessionSlice'
import createSagaMiddleware from 'redux-saga'

const middleware = createSagaMiddleware()

export default configureStore({
  reducer: {
    session: sessionSlice
  },
})