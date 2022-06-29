import React from "react"
import styled from "styled-components"

import { Link, RouteComponentProps, withRouter } from "react-router-dom"
import logo from "../../public/logo.png"
import { Cart } from "./cart"
import { CurrencySwitcher } from "./currency"

const pages = [
	{ name: "All", url: "/" },
	{ name: "Clothes", url: "/clothes" },
	{ name: "Tech", url: "/tech" }
]

class header extends React.Component<RouteComponentProps, { active: string }> {
	constructor(props: any) {
		super(props)
		this.state = {
			active: "All"
		}
	}
	addStickyHeader = () => {
		const header = document.getElementById("header")!
		if (window.scrollY > header.clientHeight) {
			header.classList.add("sticky")
		} else {
			header.classList.remove("sticky")
		}
	}
	activeLink = (page: string) => {
		return () => {
			this.setState({ active: page })
		}
	}
	componentDidMount() {
		this.setState({ active: this.props.history.location.pathname.split("/")[1] || "All" })
		window.addEventListener("scroll", this.addStickyHeader)
	}
	componentWillUnmount() {
		window.removeEventListener("scroll", this.addStickyHeader)
	}
	render() {
		return (
			<HeaderWrapper id="header">
				<HeaderInner>
					<nav>
						<Ul>
							{pages.map((item) => (
								<Li
									key={item.name}
									active={this.state.active.toLowerCase() === item.name.toLowerCase() ? true : false}
								>
									<Link onClick={this.activeLink(item.name)} to={item.url}>
										{item.name}
									</Link>
								</Li>
							))}
						</Ul>
					</nav>
					<div>
						<img src={logo} alt="Logo" />
					</div>
					<Actions>
						<CurrencySwitcher />
						<Cart />
					</Actions>
				</HeaderInner>
			</HeaderWrapper>
		)
	}
}
export const Header = withRouter(header)
const HeaderWrapper = styled.header``
const HeaderInner = styled.div`
	max-width: 1400px;
	padding: 0 10px;
	min-height: 80px;

	display: flex;
	margin: 0 auto;
	align-items: center;
	justify-content: space-between;
`

const Ul = styled.ul`
	display: flex;
	align-items: center;
	& li:not(:last-child) {
		margin-right: 16px;
	}
`
interface LiProps {
	active: boolean
}
const Li = styled.li<LiProps>`
	font-size: 10px;
	@media (min-width: 576px) {
		font-size: 16px;
	}
	color: #1d1f22;
	text-transform: uppercase;
	position: relative;
	cursor: pointer;
	&:before {
		content: "";
		position: absolute;
		bottom: -5px;
		left: 0;
		background: #5ece7b;
		width: 100%;
		height: 1px;
		transition: all 0.2s linear;
		opacity: ${(props) => (props.active ? "1" : "0")};
	}
	&:hover::before {
		opacity: 1;
		background: #3eb55e;
	}
`
const Actions = styled.div`
	display: flex;
`
