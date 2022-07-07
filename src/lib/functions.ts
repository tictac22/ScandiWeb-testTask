import { Prices } from "../interfaces"

export const getCurrentPrice = (labelPrice: string, priceArr: Prices[]) => {
	const currency = priceArr.find((item) => item.currency.label === labelPrice)!
	const formatedPrice = new Intl.NumberFormat("en-US").format(currency.amount)

	return `${currency.currency.symbol + formatedPrice}`
}

export const addPaging = (isActive: boolean) => {
	const scrollWidth = window.innerWidth - document.documentElement.clientWidth
	const pageBody = document.body
	if (isActive) {
		pageBody.style.paddingRight = `0px`
		pageBody.classList.remove("_lock")
	} else {
		pageBody.style.paddingRight = `${scrollWidth}px`
		pageBody.classList.add("_lock")
	}
}
