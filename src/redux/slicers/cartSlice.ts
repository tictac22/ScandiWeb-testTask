import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CartItemsBase, IChangeCurrency, PayloadCartItems } from "./cartSlice.d"

interface CartState {
	price: string
	priceInNumber: number
	total: number
	currency: {
		label: string
		symbol: string
	}
	items: CartItemsBase[]
}

const { cartItems, selectedCurrency, cartItemsTotal, cartItemsPrice, cartItemsPriceInNumber } = getFromLocalStorage()

const initialState: CartState = {
	price: cartItemsPrice,
	priceInNumber: cartItemsPriceInNumber,
	total: cartItemsTotal,
	currency: selectedCurrency,
	items: cartItems
}

export const counterSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		changeCurrency: (state, action: PayloadAction<IChangeCurrency>) => {
			state.currency = action.payload
			const { stringPrice, price } = getPrice(state.items, state.currency.label)
			state.price = stringPrice
			state.priceInNumber = price
		},
		addToCart: (state, action: PayloadAction<PayloadCartItems>) => {
			const addedObject = getObjectFromState(state.items, action.payload)
			if (addedObject) {
				addedObject.count++
			} else {
				state.items.push({ ...action.payload, count: 1 })
			}
			const { total, price, stringPrice } = reCountState(state)
			state.total = total
			state.price = stringPrice
			state.priceInNumber = price
		},
		incrementCountItem: (state, action: PayloadAction<PayloadCartItems>) => {
			const addedObject = getObjectFromState(state.items, action.payload)
			addedObject.count++
			const { total, price, stringPrice } = reCountState(state)
			state.total = total
			state.price = stringPrice
			state.priceInNumber = price
		},
		decrementCountItem: (state, action: PayloadAction<PayloadCartItems>) => {
			const addedObject = getObjectFromState(state.items, action.payload)
			if (addedObject.count === 1) {
				const ind = state.items.findIndex((item) => objectsEqual(item, addedObject))
				state.items.splice(ind, 1)
			} else {
				addedObject.count--
			}
			const { total, price, stringPrice } = reCountState(state)
			state.total = total
			state.price = stringPrice
			state.priceInNumber = price
		}
	}
})

export const { changeCurrency, addToCart, incrementCountItem, decrementCountItem } = counterSlice.actions

export const cartReducer = counterSlice.reducer

const objectsEqual = (o1: Object, o2: Object): boolean =>
	typeof o1 === "object" && Object.keys(o1).length > 0
		? Object.keys(o1).length === Object.keys(o2).length &&
		  Object.keys(o1).every((p) => objectsEqual(o1[p as keyof typeof o1], o2[p as keyof typeof o2]))
		: o1 === o2

const arraysEqual = (a1: Array<{}>, a2: Array<{}>) =>
	a1.length === a2.length && a1.every((o, idx) => objectsEqual(o, a2[idx]))

const getObjectFromState = (stateItems: CartItemsBase[], cartItem: PayloadCartItems) => {
	const id = cartItem.id
	return stateItems.find((item) => item.id === id && arraysEqual(item.attributes, cartItem.attributes))!
}

function getFromLocalStorage() {
	const currencyFromLS = window.localStorage.getItem("selectedCurrency")
	const selectedCurrency = currencyFromLS ? JSON.parse(currencyFromLS) : { label: "USD", symbol: "$" }

	const cartItemsLS = window.localStorage.getItem("cartItems")
	const cartItems = cartItemsLS ? JSON.parse(cartItemsLS) : []

	const cartItemsTotal = cartItems ? totalCount(cartItems) : 0
	const { price, stringPrice } = cartItems
		? getPrice(cartItems, selectedCurrency.label)
		: { price: 0, stringPrice: "0" }
	return {
		selectedCurrency,
		cartItems,
		cartItemsTotal,
		cartItemsPrice: stringPrice,
		cartItemsPriceInNumber: price
	}
}

function totalCount(arr: CartItemsBase[]) {
	return arr.reduce((prev, current) => prev + current.count, 0)
}

function getPrice(arr: CartItemsBase[], currentCurrency: string) {
	const price = arr.reduce((prev, current, index, arr) => {
		return +(
			prev +
			current.count * current.prices.find((item) => item.currency.label === currentCurrency)!.amount
		).toFixed(2)
	}, 0)
	const stringPrice = new Intl.NumberFormat("en-US").format(price)
	return {
		price,
		stringPrice
	}
}

const reCountState = (state: CartState) => {
	const total = totalCount(state.items)
	const { price, stringPrice } = getPrice(state.items, state.currency.label)
	return {
		total,
		price,
		stringPrice
	}
}
