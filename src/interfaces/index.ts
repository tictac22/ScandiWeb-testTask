export interface IProduct {
	inStock: boolean
	name: string
	id: string
	gallery: string[]
	prices: Prices[]
	attributes: Attribute[]
}
export interface Prices {
	amount: number
	currency: {
		label: string
		symbol: string
	}
}

export interface ProductPageData {
	name: string
	description: string
	gallery: string[]
	prices: Prices[]
	attributes: Attribute[]
	id: string
}
export interface ProductState {
	name: string
	selected: boolean
	value: string
	type: string
	items: Item[]
}

export interface CartItemProps {
	name: string
	id: string
	gallery: string[]
	attributes: ModifiedAttributes[]
	prices: Prices[]
	count: number
	currentCurrency: string
}

interface Attribute {
	name: string
	type: string
	items: Item[]
}

interface Item {
	displayValue: string
	value: string
}

export interface ModifiedAttributes extends Attribute {
	selected: boolean
	value: string
}

interface Item {
	displayValue: string
	value: string
}
