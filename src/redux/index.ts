// Redux Toolkit
import { configureStore } from '@reduxjs/toolkit'

// Reducer
import { rootReducer } from './/reducer/root.reducer'

export const store = configureStore({
	reducer: rootReducer
})
