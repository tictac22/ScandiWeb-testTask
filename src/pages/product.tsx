import parse from "html-react-parser"
import { Component } from "react"
import { connect, ConnectedProps } from "react-redux"
import { RouteComponentProps, withRouter } from "react-router-dom"
import styled from "styled-components"
import { AttributesItems } from "../components/attributesItems"
import { ProductGallery } from "../components/productGallery"
import { Spinner } from "../components/spinner"
import { ModifiedAttributes, ProductPageData } from "../interfaces"
import { getCurrentPrice } from "../lib/functions"
import { getProductById } from "../lib/opus"
import { addToCart } from "../redux/slicers/cartSlice"
import { RootState } from "../redux/store"

interface RouterParams {
	id: string
}
interface State {
	isLoading: boolean
	isError: boolean
	pageData: ProductPageData
	mainImage: string
	attributes: ModifiedAttributes[]
	notSelected: boolean
}
type Props = RouteComponentProps<RouterParams> & PropsRedux
class Products extends Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = {
			isLoading: true,
			isError: false,
			pageData: {
				name: "",
				description: "",
				gallery: [],
				prices: [],
				attributes: [],
				id: ""
			},
			mainImage: "",
			attributes: [],
			notSelected: false
		}
	}
	getProduct = async (id: string) => {
		this.setState({ isLoading: true })
		try {
			const data = (await getProductById(id)) as unknown as ProductPageData
			this.setState({
				pageData: data,
				isLoading: false,
				mainImage: data.gallery[0],
				attributes: [
					...data.attributes.map((item) => ({
						name: item.name,
						selected: false,
						items: item.items,
						type: item.type,
						value: ""
					}))
				]
			})
		} catch (error) {
			this.setState({ isError: true, isLoading: false })
		}
	}
	handleAttribute = (e: React.MouseEvent, name: string, value: string) => {
		e.preventDefault()
		let attribute = this.state.attributes.findIndex((item) => item.name === name)!
		let state = [...this.state.attributes]

		state[attribute] = { ...state[attribute], selected: true, value }
		this.setState({ attributes: state })
	}
	addToCart = () => {
		if (this.state.attributes.find((item) => item.selected === false)) {
			this.setState({ notSelected: true })
			return
		}
		this.props.addToCart({ ...this.state.pageData, attributes: this.state.attributes })
	}
	componentDidMount() {
		this.getProduct(this.props.match.params.id)
	}
	render() {
		return (
			<div className="container">
				{this.state.isLoading ? (
					<Spinner />
				) : (
					<Wrapper>
						<ProductGallery name={this.state.pageData.name} gallery={this.state.pageData.gallery} />
						<Info>
							<Title>{this.state.pageData.name}</Title>
							<AttributesWrapper>
								<AttributesItems
									handleAttribute={this.handleAttribute}
									attributes={this.state.pageData.attributes}
									inStock={true}
									stateAttributes={this.state.attributes}
								/>
							</AttributesWrapper>
							<PriceTitle>Price:</PriceTitle>
							<PriceText>
								{this.state.pageData.prices.length > 0 &&
									getCurrentPrice(this.props.selectedCurrency.label, this.state.pageData.prices)}
							</PriceText>
							<AddTo
								className="btn"
								disabled={
									this.state.notSelected && this.state.attributes.find((item) => !item.selected)
										? true
										: false
								}
								onClick={this.addToCart}
							>
								add to cart
							</AddTo>
							{(this.state.notSelected && this.state.attributes.find((item) => !item.selected)
								? true
								: false) && <NotSelected>Select all attributes</NotSelected>}
							<Description>{parse(this.state.pageData.description)}</Description>
						</Info>
					</Wrapper>
				)}
			</div>
		)
	}
}

const mapStateToProps = (state: RootState) => {
	return {
		selectedCurrency: state.cart.currency
	}
}
const mapDispatchToProps = {
	addToCart
}
const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsRedux = ConnectedProps<typeof connector>

export const ProductPage = withRouter(connector(Products))

const Wrapper = styled.div`
	display: flex;
	align-items: flex-start;
	@media (max-width: 920px) {
		flex-wrap: wrap;
		justify-content: center;
	}
`

const Info = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 15px;
	@media (min-width: 920px) {
		margin-top: 0px;
		margin-left: 100px;
		flex-basis: 292px;
	}
	flex-basis: 100%;
`

const Title = styled.h2`
	margin-bottom: 10px;
`

const AttributesWrapper = styled.div`
	margin-top: 20px;
`

const PriceTitle = styled.p`
	@media (min-width: 920px) {
		margin-top: 36px;
	}
	font-weight: 700;
`
const PriceText = styled.div`
	margin-top: 10px;
	font-weight: 700;
	font-size: 24px;
`

const AddTo = styled.button<{ disabled: boolean }>`
	background-color: ${(props) => (props.disabled ? "gray" : "#5ece7b")};

	width: 100%;
	margin-top: 20px;
	cursor: pointer;
	&:hover {
		background-color: ${(props) => (props.disabled ? "gray" : "#4fb069")};
	}
`
const NotSelected = styled.p`
	margin-top: 20px;
	font-size: 16px;
	text-decoration: underline;
	color: red;
`
const Description = styled.div`
	margin-top: 40px;
	& p {
		margin-top: 7px;
		font-size: 16px;
		font-family: "Roboto", sans-serif;
		line-height: 159.96%;
	}
`
