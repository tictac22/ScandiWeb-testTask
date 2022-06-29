import { Component } from "react"
import { connect, ConnectedProps } from "react-redux"
import styled from "styled-components"
import cart from "../../../public/cart.svg"
import { RootState } from "../../../redux/store"

interface Props extends PropsFromRedux {
	handleBag: () => void
}
class cartHeader extends Component<Props> {
	render() {
		return (
			<div onClick={this.props.handleBag}>
				<img src={cart} alt="Cart" />
				{this.props.count > 0 && <CartCount>{this.props.count || ""}</CartCount>}
			</div>
		)
	}
}

const mapStateToProps = (state: RootState) => {
	return {
		count: state.cart.total
	}
}

const connector = connect(mapStateToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export const CartHeader = connector(cartHeader)

const CartCount = styled.div`
	position: absolute;
	top: -11px;
	right: -8px;
	color: white;
	background: #1d1f22;
	border-radius: 60px;
	padding: 2px;
	min-width: 20px;
	height: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding-bottom: 6px;
	font-weight: 700;
	font-size: 14px;
`
