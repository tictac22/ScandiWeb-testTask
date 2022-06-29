import React from "react"
import styled from "styled-components"
import { CartItemProps } from "../../interfaces"
import { getCurrentPrice } from "../../lib/functions"
import { AttributesSelectedItems } from "../attributesItems/attributesSelectedItems"

import { MapDispatchToProps } from "../../pages/cart"
import { CartImageSlider } from "./cartImageSlider"

export class CartItem extends React.PureComponent<CartItemProps & MapDispatchToProps> {
	render() {
		const { decrementCountItem, incrementCountItem, ...cartItemValue } = this.props
		return (
			<Wrapper>
				<CartInfo>
					<CartName>{this.props.name}</CartName>
					<CartPrice>{getCurrentPrice(this.props.currentCurrency, this.props.prices)}</CartPrice>
					<AttributesWrapper>
						<AttributesSelectedItems attributes={this.props.attributes} />
					</AttributesWrapper>
				</CartInfo>
				<CartSlider>
					<Counter>
						<CounterItem onClick={() => incrementCountItem(cartItemValue)}>+</CounterItem>
						<ItemCount>{this.props.count}</ItemCount>
						<CounterItem
							onClick={(e: React.MouseEvent) => {
								e.stopPropagation()
								decrementCountItem(cartItemValue)
							}}
						>
							-
						</CounterItem>
					</Counter>
					<CartImageSlider name={this.props.name} gallery={this.props.gallery} />
				</CartSlider>
			</Wrapper>
		)
	}
}

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 24px 0px;
	border-top: 1px solid #e5e5e5;
	border-bottom: 1px solid #e5e5e5;
	@media (max-width: 600px) {
		flex-direction: column;
	}
`
const CartInfo = styled.div``
const CartName = styled.p`
	font-weight: 400;
	font-size: 30px;
`
const CartPrice = styled.p`
	font-weight: 700;
	font-size: 24px;
	margin-top: 15px;
`
const AttributesWrapper = styled.div`
	margin-top: 10px;
`

const CartSlider = styled.div`
	display: flex;
	@media (max-width: 600px) {
		flex-direction: column;
		align-items: center;
	}
`

const Counter = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	cursor: pointer;
	@media (max-width: 600px) {
		flex-direction: row;
		width: 100%;
		align-items: center;
		margin: 20px 0px;
	}
`

const CounterItem = styled.div`
	transition: background-color 0.3s linear;
	border: 1px solid #1d1f22;
	width: 45px;
	height: 45px;
	display: flex;
	align-items: center;
	justify-content: center;
	&:hover {
		background-color: #d0d0d0;
	}
`

const ItemCount = styled.p`
	font-size: 16px;
	font-weight: 500;
	text-align: center;
`
