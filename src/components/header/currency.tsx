import React from "react"
import { connect, ConnectedProps } from "react-redux"
import styled from "styled-components"
import { getCurrencies } from "../../lib/opus"
import arrow from "../../public/arrow.svg"
import { changeCurrency } from "../../redux/slicers/cartSlice"
import { RootState } from "../../redux/store"

interface Currency {
	label: string
	symbol: string
}
interface State {
	currencyMenu: boolean
	currencies: Currency[]
}

class Cs extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = {
			currencyMenu: false,
			currencies: []
		}
	}

	ref = React.createRef<HTMLDivElement>()
	handleClickOutside = (event: MouseEvent) => {
		const target = event.target!
		if (this.ref.current && this.state.currencyMenu && !this.ref.current?.contains(target as Node)) {
			this.setState({ currencyMenu: false })
		}
	}
	handleCurrency = ({ label, symbol }: { label: string; symbol: string }) => {
		const currency = {
			label,
			symbol
		}
		window.localStorage.setItem("selectedCurrency", JSON.stringify(currency))
		this.props.changeCurrency(currency)
	}
	componentDidMount() {
		window.addEventListener("click", this.handleClickOutside)
		getCurrencies().then((currencies) => {
			let typedCurrencies = currencies as unknown as Currency[]
			this.setState({ currencies: typedCurrencies })
		})
	}

	componentWillUnmount() {
		window.removeEventListener("click", this.handleClickOutside)
	}

	render() {
		return (
			<Currency ref={this.ref} onClick={() => this.setState({ currencyMenu: !this.state.currencyMenu })}>
				<div>{this.props.price.symbol}</div>
				<div>
					<Image active={this.state.currencyMenu} src={arrow} alt="Arrow" />
				</div>
				<Menu active={this.state.currencyMenu}>
					<ul>
						{this.state.currencies.length > 0 &&
							this.state.currencies.map((item) => (
								<MenuLi
									key={item.label}
									onClick={() => {
										this.handleCurrency({ label: item.label, symbol: item.symbol })
									}}
									selected={item.label === this.props.price.label ? true : false}
								>
									{item.symbol} {item.label}
								</MenuLi>
							))}
					</ul>
				</Menu>
			</Currency>
		)
	}
}
//selected={true}
const mapStateToProps = (state: RootState) => {
	return {
		price: state.cart.currency
	}
}
const mapDispatchToProps = {
	changeCurrency
}
const connector = connect(mapStateToProps, mapDispatchToProps)
type Props = ConnectedProps<typeof connector>

export const CurrencySwitcher = connector(Cs)

const Currency = styled.div`
	cursor: pointer;
	position: relative;
	display: flex;
	& div:first-child {
		margin-right: 5px;
	}
`
interface ImageProps {
	active: boolean
}
const Image = styled.img<ImageProps>`
	transition: all 0.3s linear;
	transform: rotateX(${(props) => (props.active ? "180deg" : "0deg")});
`
interface MenuProps {
	active: boolean
}
const Menu = styled.div<MenuProps>`
	transition: all 0.3s linear;
	z-index: 100;
	position: absolute;
	width: 114px;
	top: 31px;
	left: -54px;
	filter: drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.19));
	background: #fff;
	opacity: ${(props) => (props.active ? "1" : "0")};
	visibility: ${(props) => (props.active ? "visible" : "hidden")};
	pointer-events: ${(props) => (props.active ? "all" : "none")};
`
interface MenuLiProps {
	selected?: boolean
}
const MenuLi = styled.li<MenuLiProps>`
	&:hover {
		text-decoration: underline;
	}
	padding: 20px 22px 20px 20px;

	background-color: ${(props) => (props.selected ? "#EEE" : "#fff")};
`
