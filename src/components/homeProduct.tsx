import React from "react"
import { connect, ConnectedProps } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { IProduct, ProductState } from "../interfaces"
import { createText, getCurrentPrice } from "../lib/functions"
import cart from "../public/cartWhite.svg"
import { addToCart } from "../redux/slicers/cartSlice"
import { hideToast, showToast } from "../redux/slicers/toastSlice"
import { RootState } from "../redux/store"
import { AttributesItems } from "./attributesItems"

type Props = IProduct & PropsRedux

class ProductItem extends React.Component<Props, { attributes: ProductState[] }> {
	constructor(props: Props) {
		super(props)
		this.state = {
			attributes: [
				...this.props.attributes.map((item) => ({
					name: item.name,
					selected: false,
					items: item.items,
					type: item.type,
					value: ""
				}))
			]
		}
	}
	pushTo = (isAvaible: boolean) => {
		return (e: React.MouseEvent) => {
			if (!isAvaible) e.preventDefault()
		}
	}
	handleAttribute = (e: React.MouseEvent, name: string, value: string) => {
		e.preventDefault()
		let attribute = this.state.attributes.findIndex((item) => item.name === name)!
		let state = [...this.state.attributes]

		state[attribute] = { ...state[attribute], selected: true, value }
		this.setState({ attributes: state })
	}
	addToCart = (e: React.MouseEvent) => {
		e.preventDefault()
		if (this.state.attributes.find((item) => item.selected === false)) {
			this.props.showToast({ productName: this.props.name, text: createText(this.state.attributes) })
			return
		}

		this.props.addToCart({
			name: this.props.name,
			id: this.props.id,
			attributes: this.state.attributes,
			prices: this.props.prices,
			gallery: this.props.gallery
		})
	}
	render() {
		return (
			<Link onClick={this.pushTo(this.props.inStock)} to={`/product/${this.props.id}`}>
				<Wrapper id={`${this.props.name}`} avaible={this.props.inStock}>
					{!this.props.inStock && <NotAvaible>out of stock</NotAvaible>}
					<ImageWrapper>
						<Image src={this.props.gallery[0]} alt={this.props.name} loading="lazy" />
					</ImageWrapper>
					<Description>
						<Name>{this.props.name}</Name>
						<Price>{getCurrentPrice(this.props.price.label, this.props.prices)}</Price>
						<Attributes>
							<AttributesItems
								handleAttribute={this.handleAttribute}
								inStock={this.props.inStock}
								attributes={this.props.attributes}
								stateAttributes={this.state.attributes}
							/>
							{this.props.inStock && (
								<Cart onClick={this.addToCart} className="cart">
									<img src={cart} alt="put to cart" />
								</Cart>
							)}
						</Attributes>
					</Description>
				</Wrapper>
			</Link>
		)
	}
}
const mapStateToProps = (state: RootState) => {
	return {
		price: state.cart.currency
	}
}
const mapDispatchToProps = {
	addToCart,
	showToast,
	hideToast
}
const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsRedux = ConnectedProps<typeof connector>

export const Product = connector(ProductItem)

interface WrapperProps {
	avaible: boolean
}
const Wrapper = styled.div<WrapperProps>`
	opacity: ${(props) => (!props.avaible ? "0.5" : "1")};
	height: 100%;
	position: relative;
	padding: 16px;
	transition: all 0.3s linear;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	&:hover {
		filter: ${(props) => (props.avaible ? "drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.19))" : "initial")};
		background: white;
	}
	&:hover .cart {
		opacity: 1;
	}
	cursor: pointer;
`
const NotAvaible = styled.p`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	text-transform: uppercase;
	color: #8d8f9a;
	font-size: 24px;
	z-index: 7;
	white-space: nowrap;
`
const ImageWrapper = styled.div`
	position: relative;
	display: block;
	width: 100%;
`
const Image = styled.img`
	object-fit: cover;
	width: 100%;
`
const Cart = styled.div`
	transition: all 0.3s linear;
	opacity: 0;
	z-index: 5;
	padding: 15px;
	background-color: #5ece7b;
	border-radius: 50%;
	display: flex;
	width: 52px;
	height: 52px;
	margin-left: auto;
	margin-top: 20px;
	align-items: center;
	justify-content: center;
	transition: background-color 0.3s linear;
	&:hover {
		background-color: #4eaa67;
	}
`

const Description = styled.div`
	margin-top: 24px;
`
const Name = styled.p`
	font-weight: 300;
`

const Price = styled.p`
	font-weight: 500;
	margin-top: 8px;
`

const Attributes = styled.div`
	margin-top: 8px;
`
