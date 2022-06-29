import React from "react"
import { Provider } from "react-redux"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import styled from "styled-components"
import { Header } from "./components/header"
import "./index.css"
import { Cart } from "./pages/cart"
import { HomePage } from "./pages/home"
import { ProductPage } from "./pages/product"
import { store } from "./redux/store"

export class App extends React.Component {
	render() {
		return (
			<Router>
				<Provider store={store}>
					<Header />
					<Wrapper id="main_home">
						<React.Suspense fallback={<div></div>}>
							<Switch>
								<Route exact={true} path={"/"} component={HomePage} />
								<Route exact={true} path={"/:product"} component={HomePage} />
								<Route exact={true} path={"/product/:id"} component={ProductPage} />
								<Route exact={true} path={"/user/cart"} component={Cart} />
							</Switch>
						</React.Suspense>
					</Wrapper>
				</Provider>
			</Router>
		)
	}
}

const Wrapper = styled.div`
	padding: 0px 0px 25px 0px;
	position: relative;
	flex: 1 1 100%;
	@media (min-width: 576px) {
		padding-top: 80px;
	}
`
