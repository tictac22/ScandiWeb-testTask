import { configureStore } from "@reduxjs/toolkit"
import { cartReducer } from "./slicers/cartSlice"
import { toastReducer } from "./slicers/toastSlice"

export const store = configureStore({
	reducer: {
		cart: cartReducer,
		toast: toastReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
