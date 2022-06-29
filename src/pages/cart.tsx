import React from "react"
import { connect, ConnectedProps } from "react-redux"
import styled from "styled-components"
import { CartItem } from "../components/cartItem"
import { decrementCountItem, incrementCountItem } from "../redux/slicers/cartSlice"
import { RootState } from "../redux/store"

const formatNumber = (price: number) => new Intl.NumberFormat("en-US").format(price)
class CartC extends React.Component<PropsRedux> {
	render() {
		const tax = this.props.totalPriceInNumber * 0.21
		return (
			<div className="container">
				<Title>cart</Title>
				{this.props.cartItems.length <= 0 ? (
					<p style={{ textAlign: "center" }}>Your cart is empty, select any product to see it</p>
				) : (
					<>
						<div>
							{this.props.cartItems.map((item) => (
								<CartItem
									name={item.name}
									key={`${item.name} + ${item.attributes.map((item) => item.value).toString()}`}
									id={item.id}
									gallery={item.gallery}
									attributes={item.attributes}
									prices={item.prices}
									count={item.count}
									currentCurrency={this.props.currentCurrency.label}
									incrementCountItem={this.props.incrementCountItem}
									decrementCountItem={this.props.decrementCountItem}
								/>
							))}
						</div>
						<Total>
							<TotalWrapper>
								<TotalName margin={10}>Tax 21%:</TotalName>
								<TotalPrice>
									{this.props.currentCurrency.symbol}
									{formatNumber(tax)}
								</TotalPrice>
							</TotalWrapper>
							<TotalWrapper>
								<TotalName margin={0}>Quantity:</TotalName>
								<TotalPrice>{this.props.totalCount}</TotalPrice>
							</TotalWrapper>
							<TotalWrapper>
								<TotalName margin={44} style={{ fontWeight: "500" }}>
									Total:
								</TotalName>
								<TotalPrice>
									{this.props.currentCurrency.symbol}
									{this.props.totalPrice}
									<p style={{ display: "inline-block", margin: "0 5px" }}>+ Tax =</p>
									{this.props.currentCurrency.symbol}
									{formatNumber(this.props.totalPriceInNumber + tax)}
								</TotalPrice>
							</TotalWrapper>
						</Total>
						<Button className="btn">order</Button>
					</>
				)}
			</div>
		)
	}
}

const mapStateToProps = (state: RootState) => {
	return {
		cartItems: state.cart.items,
		totalCount: state.cart.total,
		totalPrice: state.cart.price,
		currentCurrency: state.cart.currency,
		totalPriceInNumber: state.cart.priceInNumber
	}
}

const mapDispatchToProps = {
	incrementCountItem,
	decrementCountItem
}
export type MapDispatchToProps = typeof mapDispatchToProps
const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsRedux = ConnectedProps<typeof connector>

export const Cart = connector(CartC)

const Title = styled.h1`
	text-transform: uppercase;
	font-weight: 700;
	font-size: 32px;
	margin-bottom: 50px;
`

const Total = styled.div`
	margin-top: 32px;
`
const TotalWrapper = styled.div`
	display: flex;
	margin-top: 8px;
	flex-wrap: wrap;
`
interface ITotalName {
	margin: number
}
const TotalName = styled.p<ITotalName>`
	font-weight: 400;
	font-size: 24px;
	margin-right: ${(props) => props.margin + "px"};
`
const TotalPrice = styled.p`
	font-weight: 700;
	font-size: 24px;
`

const Button = styled.button`
	margin-top: 16px;
	max-width: 279px;
	width: 100%;
	cursor: pointer;
	background-color: #5ece7b;
	&:hover {
		background-color: #4fb069;
	}
`
