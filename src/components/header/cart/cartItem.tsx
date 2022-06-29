import React from "react"
import { connect, ConnectedProps } from "react-redux"
import styled from "styled-components"
import { CartItemProps } from "../../../interfaces"
import { getCurrentPrice } from "../../../lib/functions"
import { decrementCountItem, incrementCountItem } from "../../../redux/slicers/cartSlice"
import { AttributesSelectedItems } from "../../attributesItems/attributesSelectedItems"

type Props = CartItemProps & ReduxProps

class CartItemC extends React.Component<Props> {
	render() {
		const { decrementCountItem, incrementCountItem, ...cartItemValue } = this.props
		return (
			<Wrapper className="cartItemOverlay">
				<Description>
					<Title>{this.props.name}</Title>
					<Price>{getCurrentPrice(this.props.currentCurrency, this.props.prices)}</Price>
					<AttributesWrapper>
						<AttributesSelectedItems attributes={this.props.attributes} />
					</AttributesWrapper>
				</Description>
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
				<Image>
					<img src={`${this.props.gallery[0]}`} alt="dsdsds" />
				</Image>
			</Wrapper>
		)
	}
}

const mapDispatchToProps = {
	incrementCountItem,
	decrementCountItem
}
const connector = connect(() => ({}), mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export const CartItem = connector(CartItemC)

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
`
const Description = styled.div`
	flex-grow: 1;
`
const Title = styled.h5`
	font-weight: 300;
`

const Price = styled.p`
	font-weight: 500;
	font-size: 16px;
	margin-top: 4px;
`

const AttributesWrapper = styled.div`
	margin-top: 8px;
`

const Counter = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin-left: 12px;
	margin-right: 8px;
`

const CounterItem = styled.div`
	transition: background-color 0.3s linear;
	border: 1px solid #1d1f22;
	width: 24px;
	height: 24px;
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

const Image = styled.div`
	height: 190px;
	max-width: 96px;
	& img {
		max-width: 100%;
		height: 100%;
	}
`
