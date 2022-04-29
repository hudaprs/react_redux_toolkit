// React Redux
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

// Reducer
import { TRootState } from '../redux/reducer/root.reducer'

// Dispatch
import { TAppDispatch } from '../redux/dispatch/root.dispatch'

export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector

export const useAppDispatch = () => useDispatch<TAppDispatch>()
