import React from "react"
import styled from "styled-components"
import arrowLeft from "../../public/arrowLeft.svg"
import arrowRight from "../../public/arrowRight.svg"

interface Props {
	gallery: string[]
	name: string
}
interface State {
	gallery: string[]
	currentImage: number
}
export class CartImageSlider extends React.Component<Props, State> {
	nextSlide = () => {
		const state = this.state.currentImage
		const gallery = this.state.gallery
		const nextIndex = state + 1
		if (nextIndex > gallery.length) {
			this.setState({ currentImage: 0 })
		} else {
			this.setState({ currentImage: nextIndex })
		}
	}
	prevSlide = () => {
		const state = this.state.currentImage
		const gallery = this.state.gallery
		const prevIndex = state - 1
		if (prevIndex < 0) {
			this.setState({ currentImage: gallery.length - 1 })
		} else {
			this.setState({ currentImage: prevIndex })
		}
	}
	constructor(props: Props) {
		super(props)
		this.state = {
			gallery: this.props.gallery,
			currentImage: 0
		}
	}
	render() {
		return (
			<Wrapper>
				{this.props.gallery.map((item, i) => (
					<Slide key={item + i} active={i === this.state.currentImage ? true : false}>
						<img src={item} alt={this.props.name} />
					</Slide>
				))}
				{this.state.gallery.length > 1 && (
					<>
						<ButtonSlider onClick={this.prevSlide} right={48}>
							<img src={arrowLeft} alt="left" />
						</ButtonSlider>
						<ButtonSlider right={16} onClick={this.nextSlide}>
							<img src={arrowRight} alt="right" />
						</ButtonSlider>
					</>
				)}
			</Wrapper>
		)
	}
}

const Wrapper = styled.div`
	width: 200px;
	height: 288px;
	position: relative;
	overflow: hidden;
	@media (min-width: 600px) {
		margin-left: 24px;
	}
`

interface ISlid {
	active: boolean
}
const Slide = styled.div<ISlid>`
	width: 100%;
	height: 100%;
	position: absolute;
	opacity: ${(props) => (props.active ? "1" : "0")};
	transition: opacity ease-in-out 0.4s;
	& img {
		width: 100%;
		height: 100%;
	}
`

interface IButtonSlider {
	right: number
}
const ButtonSlider = styled.div<IButtonSlider>`
	width: 24px;
	height: 24px;
	background: rgba(0, 0, 0, 0.73);
	position: absolute;
	right: ${(props) => props.right + "px"};
	bottom: 16px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
`
