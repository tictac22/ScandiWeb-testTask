import React from "react"
import { connect, ConnectedProps } from "react-redux"
import { RouteComponentProps, withRouter } from "react-router-dom"
import styled from "styled-components"
import { addPaging } from "../../../lib/functions"
import { RootState } from "../../../redux/store"
import { CartHeader } from "./cartHeader"
import { CartItem } from "./cartItem"

import { Link } from "react-router-dom"
interface State {
	active: boolean
}

class CartC extends React.Component<PropsRedux & RouteComponentProps, State> {
	constructor(props: PropsRedux & RouteComponentProps) {
		super(props)
		this.state = {
			active: false
		}
	}
	ref = React.createRef<HTMLDivElement>()

	handleBag = () => {
		if (window.innerWidth <= 600) {
			this.props.history.push("/user/cart")
			return
		}
		addPaging(this.state.active)

		const mainBody = document.getElementById("main_home")!
		this.state.active ? mainBody.classList.remove("home_main") : mainBody.classList.add("home_main")

		this.setState({ active: !this.state.active })
	}
	handleClickOutside = (event: MouseEvent) => {
		const target = event.target!

		if (this.ref.current && this.state.active && !this.ref.current?.contains(target as Node)) {
			this.handleBag()
		}
	}
	componentDidMount() {
		document.addEventListener("click", this.handleClickOutside)
	}
	componentDidUpdate(prevProps: PropsRedux) {
		if (prevProps.totalCount !== this.props.totalCount) {
			window.localStorage.setItem("cartItems", JSON.stringify(this.props.cartItems))
		}
	}
	componentWillUnmount() {
		document.removeEventListener("click", this.handleClickOutside)
	}
	render() {
		return (
			<CartWrapper ref={this.ref}>
				<CartHeader handleBag={this.handleBag} />
				<Bag active={this.state.active}>
					<BagWrapper>
						<div style={{ display: "flex", alignItems: "center" }}>
							<BagTitle>My Bag,</BagTitle>
							<BagCount>{this.props.totalCount} items</BagCount>
						</div>
						<CartItems>
							{this.props.cartItems.length > 0 &&
								this.props.cartItems.map((item) => (
									<CartItem
										key={`${item.gallery[0]} ${item.attributes
											.map((item) => item.value)
											.toString()}`}
										name={item.name}
										count={item.count}
										prices={item.prices}
										attributes={item.attributes}
										id={item.id}
										gallery={item.gallery}
										currentCurrency={this.props.currentCurrency.label}
									/>
								))}
						</CartItems>
						{this.props.cartItems.length > 0 && (
							<Description>
								<div>
									<DescriptionTitle>Total</DescriptionTitle>
									<Price>
										{this.props.currentCurrency.symbol}
										{this.props.totalPrice}
									</Price>
								</div>
								<div>
									<ViewBag onClick={this.handleBag} to={"/user/cart"}>
										view bag
									</ViewBag>
									<CheckOut>check out</CheckOut>
								</div>
							</Description>
						)}
					</BagWrapper>
				</Bag>
			</CartWrapper>
		)
	}
}

const mapStateToProps = (state: RootState) => {
	return {
		cartItems: state.cart.items,
		totalCount: state.cart.total,
		totalPrice: state.cart.price,
		currentCurrency: state.cart.currency
	}
}
const connector = connect(mapStateToProps)
type PropsRedux = ConnectedProps<typeof connector>

export const Cart = withRouter(connector(CartC))

const CartWrapper = styled.div`
	margin-left: 22px;
	cursor: pointer;
	position: relative;
`

interface IBad {
	active: boolean
}
const Bag = styled.div<IBad>`
	transition: all 0.3s linear;
	opacity: ${(props) => (props.active ? "1" : "0")};
	pointer-events: ${(props) => (props.active ? "all" : "none")};
	visibility: ${(props) => (props.active ? "visible" : "hidden")};
	width: 325px;
	background: white;
	position: absolute;
	z-index: 40;
	top: 33px;
	left: -295px;
`
const BagWrapper = styled.div`
	padding: 32px 16px;

	@media (max-width: 350px) {
		padding: 32px 32px;
	}
`
const BagTitle = styled.h2`
	font-weight: 700;
`
const CartItems = styled.div`
	overflow-y: scroll;
	height: 438px;
	margin-top: 32px;
	padding-right: 5px;
	&::-webkit-scrollbar {
		appearance: none;
		width: 5px;
	}

	&::-webkit-scrollbar-thumb {
		border-radius: 0.25rem;
		background-color: rgba(0, 0, 0, 0.5);
		box-shadow: rgb(255 255 255 / 50%) 0px 0px 1px;
	}
	&::-webkit-scrollbar-track {
	}

	& .cartItemOverlay:not(:first-child) {
		margin-top: 32px;
	}
`

const BagCount = styled.p`
	font-weight: 700;
	font-size: 20px;
`

const Description = styled.div`
	margin-top: 41px;
	& div:last-child {
		margin-top: 32px;
	}
	& div {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
`

const DescriptionTitle = styled.h3`
	font-weight: 500;
`
const Price = styled.p`
	font-weight: 700;
`

const ViewBag = styled(Link)`
	font-weight: 600;
	transition: background-color 0.3s linear;
	padding: 13px 30px;
	font-size: 14px;
	text-transform: uppercase;
	border: 1px solid #1d1f22;
	background-color: white;
	&:hover {
		background-color: #dddbdb;
	}
`

const CheckOut = styled.button`
	transition: background-color 0.3s linear;
	border: 1px solid #5ece7b;
	font-size: 14px;

	background-color: #5ece7b;
	color: #ffffff;
	padding: 13px 30px;
	text-transform: uppercase;
	&:hover {
		background-color: #4db368;
	}
`
