export interface State extends IHeader {
	active: string
}

type Categories = {
	name: string
}
type Currencies = {
	label: string
	symbol: string
}

export interface IHeader {
	categories: Categories[]
	currencies: Currencies[]
}
