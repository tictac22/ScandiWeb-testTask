import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface InitialState {
	showPopup: boolean
	text: string
}

const initialState: InitialState = {
	showPopup: false,
	text: ""
}

export const toastSlice = createSlice({
	name: "toast",
	initialState,
	reducers: {
		showToast: (state, action: PayloadAction<{ productName: string; text: string }>) => {
			state.showPopup = true
			state.text = action.payload.text
		},
		hideToast: (state) => {
			state.showPopup = false
		}
	}
})

export const { showToast, hideToast } = toastSlice.actions
export const toastReducer = toastSlice.reducer
