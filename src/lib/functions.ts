import { Prices } from "../interfaces"

export const getCurrentPrice = (labelPrice: string, priceArr: Prices[]) => {
	const currency = priceArr.find((item) => item.currency.label === labelPrice)!
	const formatedPrice = new Intl.NumberFormat("en-US").format(currency.amount)

	return `${currency.currency.symbol + formatedPrice}`
}

export const createText = (attributes: State[]) => {
	const notSelected = attributes.filter((item) => !item.selected)
	const string = notSelected.reduce((prev, current, index, array) => {
		return (
			prev +
			current.name +
			(array.length - 2 === index ? " and " : "") +
			(array.length - 1 === index || array.length - 2 === index ? "" : ", ")
		)
	}, "")
	return `Please select: ${string}`
}
export const addPaging = (isActive: boolean) => {
	const scrollWidth = window.innerWidth - document.documentElement.clientWidth
	const pageBody = document.querySelector("body")!
	if (isActive) {
		pageBody.style.paddingRight = `0px`
		pageBody.classList.remove("_lock")
	} else {
		pageBody.style.paddingRight = `${scrollWidth}px`
		pageBody.classList.add("_lock")
	}
}

interface test {
	displayValue: string
	value: string
}
interface State {
	name: string
	selected: boolean
	value: string
	type: string
	items: test[]
}
