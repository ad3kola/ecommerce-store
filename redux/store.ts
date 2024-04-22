import { configureStore } from '@reduxjs/toolkit'
import CartSlice from './features/CartSlice'
import CartModal from './features/CartModal'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

const store = configureStore({
  reducer: {
    cart: CartModal,
    CartSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store