import React from "react"
import { RouteComponentProps, withRouter } from "react-router-dom"
import styled from "styled-components"
import { Product } from "../components/homeProduct"
import { Spinner } from "../components/spinner"
import { Toast } from "../components/toast"
import { IProduct } from "../interfaces"
import { getProductsByCategory } from "../lib/opus"

interface State {
	isLoading: boolean
	isError: boolean
	products: IProduct[]
}

class Home extends React.Component<RouteComponentProps, State> {
	constructor(props: any) {
		super(props)
		this.state = {
			isLoading: false,
			isError: false,
			products: []
		}
	}
	getProducts = async () => {
		this.setState({ isLoading: true })
		const path = this.props.match.url.split("/")[1]
		try {
			const data = await getProductsByCategory(path)
			const products = data.products as unknown as IProduct[]
			this.setState({ products, isLoading: false })
		} catch (error) {
			this.setState({ isLoading: false, isError: true })
		}
	}
	componentDidMount() {
		this.getProducts()
	}
	componentDidUpdate(prevProps: RouteComponentProps, prevState: State) {
		if (prevProps.match.url !== this.props.match.url) {
			this.getProducts()
		}
	}
	render() {
		return (
			<Wrapper>
				<div className="container" style={{ position: "relative" }}>
					<Toast />
					<PageTitle>{this.props.match.url.split("/")[1] || "all"}</PageTitle>
					{this.state.isLoading ? (
						<Spinner />
					) : this.state.isError ? (
						<Error>Error on server side, please retry</Error>
					) : (
						<ProductWrapper>
							{this.state.products.map((item) => (
								<Product
									id={item.id}
									gallery={item.gallery}
									attributes={item.attributes}
									inStock={item.inStock}
									prices={item.prices}
									name={item.name}
									key={item.name}
								/>
							))}
						</ProductWrapper>
					)}
				</div>
			</Wrapper>
		)
	}
}
export const HomePage = withRouter(Home)

const Wrapper = styled.main``
const PageTitle = styled.h1`
	text-transform: capitalize;
	color: #1d1f22;
	font-size: 42px;
`
const ProductWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(285px, 300px));
	grid-gap: 40px;
	justify-content: center;
	@media (min-width: 576px) {
		margin-top: 55px;
	}
`

const Error = styled.div`
	display: block;
	text-align: center;
	margin: 0 auto;
	margin-top: 40px;
`
