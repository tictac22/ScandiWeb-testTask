export interface IChangeCurrency {
	label: string
	symbol: string
}
export interface IAddToCart {
	name: string
	id: string
}

export interface PayloadCartItems extends CartItems {}

export interface CartItemsBase extends CartItems {
	count: number
}

interface CartItems {
	name: string
	id: string
	gallery: string[]
	attributes: CartAttributes[]
	prices: CartStatePrice[]
	brand: string
}

interface CartAttributes {
	name: string
	selected: boolean
	value: string
	type: string
	items: Attributes[]
}
interface CartStatePrice {
	amount: number
	currency: {
		label: string
		symbol: string
	}
}

interface Attributes {
	displayValue: string
	value: string
}
