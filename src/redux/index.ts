// Redux Toolkit
import { configureStore } from '@reduxjs/toolkit'

// Slice
import todo from './slice/todo.slice'

export const store = configureStore({
	reducer: {
		todo
	}
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type TRootState = ReturnType<typeof store.getState>

// Inferred type: { posts: State, anotherModule: State }
export type TAppDispatch = typeof store.dispatch
