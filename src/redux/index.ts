// Redux Toolkit
import { configureStore } from '@reduxjs/toolkit'

// Reducer
import { rootReducer, TRootState } from './/reducer/root.reducer'

// Redux Persist
import {
	persistReducer,
	persistStore,
	PersistConfig,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

// Redux Persist Transform Filter
import { createWhitelistFilter } from 'redux-persist-transform-filter'

// Persist config
const persistConfig: PersistConfig<TRootState> = {
	key: 'root',
	version: 1,
	storage,
	transforms: [createWhitelistFilter('todo', ['todo_list'])]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		})
})

export const persistor = persistStore(store)
