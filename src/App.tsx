import React from "react"
import { Provider } from "react-redux"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import styled from "styled-components"
import { Header } from "./components/header"
import { BodyContext } from "./context"
import "./index.css"
import { addPaging } from "./lib/functions"
import { Cart } from "./pages/cart"
import { HomePage } from "./pages/home"
import { ProductPage } from "./pages/product"
import { store } from "./redux/store"

export class App extends React.Component {
	ref = React.createRef<HTMLDivElement>()
	handleBag = (history: any, active: boolean) => {
		if (window.innerWidth <= 600) {
			history.push("/user/cart")
			return
		}
		addPaging(active)

		const mainBody = this.ref.current!
		active ? mainBody.classList.remove("home_main") : mainBody.classList.add("home_main")

		return !active
	}
	render() {
		return (
			<Router>
				<Provider store={store}>
					<BodyContext.Provider value={{ handleBag: this.handleBag, test: "123" }}>
						<Header />
						<Wrapper ref={this.ref} id="main_home">
							<Switch>
								<Route exact={true} path={"/"} component={HomePage} />
								<Route exact={true} path={"/:product"} component={HomePage} />
								<Route exact={true} path={"/product/:id"} component={ProductPage} />
								<Route exact={true} path={"/user/cart"} component={Cart} />
							</Switch>
						</Wrapper>
					</BodyContext.Provider>
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
