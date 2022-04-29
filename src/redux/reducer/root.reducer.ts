// Redux Toolkit
import { combineReducers } from '@reduxjs/toolkit'

// Reducer
import todo from './todo.reducer'

export const rootReducer = combineReducers({
	todo
})

export type TRootState = ReturnType<typeof rootReducer>
