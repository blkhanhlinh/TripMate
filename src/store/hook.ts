import { useSelector } from 'react-redux'
import { useDispatch, TypedUseSelectorHook } from 'react-redux'
import { AppDispatch, RootState } from '.'

export const useAppDispatch: () => AppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
