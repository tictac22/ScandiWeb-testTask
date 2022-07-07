import React from "react"
import { connect, ConnectedProps } from "react-redux"
import styled from "styled-components"
import { hideToast } from "../redux/slicers/toastSlice"
import { RootState } from "../redux/store"

type setTimeoutType = ReturnType<typeof setTimeout>
class ToastC extends React.Component<Props, { top: number; timer: null | setTimeoutType }> {
	constructor(props: Props) {
		super(props)
		this.state = {
			top: 200,
			timer: null
		}
	}
	componentDidUpdate(prev: Props) {
		if (this.props.isShow && prev !== this.props) {
			if (this.state.timer) {
				clearTimeout(this.state.timer)
			}
			this.setState({
				timer: setTimeout(() => {
					this.props.hideToast()
				}, 2000)
			})
			const product = window.pageYOffset
			this.setState({ top: product })
		}
	}
	render() {
		return (
			<Wrapper visible={this.props.isShow} top={this.state.top}>
				{this.props.text}
			</Wrapper>
		)
	}
}

const mapStateToProps = (state: RootState) => {
	return {
		isShow: state.toast.showPopup,
		text: state.toast.text
	}
}
const mapDispatchToProps = {
	hideToast
}
const connector = connect(mapStateToProps, mapDispatchToProps)
type Props = ConnectedProps<typeof connector>

export const Toast = connector(ToastC)

interface IWrapper {
	top: number
	visible: boolean
}
const Wrapper = styled.div<IWrapper>`
	transition: transform 0.4s linear;
	transform: translateX(${(props) => (props.visible ? "0px" : "-50px")});
	position: absolute;
	opacity: ${(props) => (props.visible ? "1" : "0")};
	pointer-events: ${(props) => (props.visible ? "all" : "none")};
	top: ${(props) => props.top + "px"};
	padding: 20px;
	border-radius: 7px;
	max-width: 285px;
	z-index: 1000;
	background: #ffffff;
	filter: drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.19));
`
