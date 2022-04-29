// Redux Toolkit
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

// Slice
import todo from './slice/todo.slice'

// Api
import { todoApi } from './api/todo.api'

export const store = configureStore({
	reducer: {
		[todoApi.reducerPath]: todoApi.reducer,
		todo
	},
	// Adding the api middleware enables caching, invalidation, polling,
	// and other useful features of `rtk-query`.
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(todoApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type TRootState = ReturnType<typeof store.getState>

// Inferred type: { posts: State, anotherModule: State }
export type TAppDispatch = typeof store.dispatch

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
