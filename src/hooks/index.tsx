// React Redux
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'

// Redux
import { TAppDispatch, TRootState } from '../redux'

const useAppDispatch = () => useDispatch<TAppDispatch>()
const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector

export { useAppDispatch, useAppSelector }
