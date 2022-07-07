import React from "react"
import styled from "styled-components"

interface Props {
	gallery: string[]
	name: string
}
interface State {
	mainImage: string
	gallery: string[]
}
export class ProductGallery extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = {
			gallery: this.props.gallery,
			mainImage: this.props.gallery[0]
		}
	}
	changeImage = (index: number) => {
		const selectedImage = this.state.gallery[index]
		if (selectedImage === this.state.mainImage) return
		this.setState({ mainImage: selectedImage })
	}
	render() {
		return (
			<Gallery>
				<GalleryMain>
					<img src={this.state.mainImage} alt={this.props.name} />
				</GalleryMain>
				{this.props.gallery.length > 1 && (
					<GalleryWrapper>
						<GalleryInner extended={this.props.gallery.length > 5}>
							{this.props.gallery.map((item, index) => (
								<GalleryItem key={item}>
									<GalleryImage
										onClick={() => {
											this.changeImage(index)
										}}
									>
										<img src={item} alt={this.props.name} />
									</GalleryImage>
								</GalleryItem>
							))}
						</GalleryInner>
					</GalleryWrapper>
				)}
			</Gallery>
		)
	}
}

const Gallery = styled.div`
	@media (min-width: 920px) {
		display: flex;
	}
	flex: 0 1 65%;
	@media (max-width: 920px) {
		text-align: center;
	}
`

const GalleryMain = styled.div`
	margin-top: 20px;
	order: 1;
	@media (min-width: 920px) {
		margin-top: 0px;
	}
	& img {
		max-width: 100%;
		object-fit: cover;
		@media (max-width: 920px) {
			width: 100%;
		}
		@media (min-width: 920px) {
			max-height: 511px;
			flex-basis: 610px;
			min-height: 320px;
		}
	}
`

const GalleryWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	@media (min-width: 920px) {
		margin-right: 40px;
		& div:not(:first-child) {
			margin-top: 20px;
		}
	}
`
interface IGalleryInner {
	extended: boolean
}
const GalleryInner = styled.div<IGalleryInner>`
	@media (max-width: 920px) {
		display: grid;
		grid-template-columns: repeat(auto-fill, 82px);
		grid-gap: 20px;
		justify-content: center;
	}
	@media (min-width: 920px) {
		max-height: ${(props) => (props.extended ? "500px" : "none")};
		overflow-y: ${(props) => (props.extended ? "scroll" : "none")};
		padding-left: ${(props) => (props.extended ? "6px" : "0px")};
		direction: rtl;
		&::-webkit-scrollbar {
			appearance: none;
			width: 3px;
		}
	}
	&::-webkit-scrollbar-thumb {
		border-radius: 0.25rem;
		background-color: rgba(0, 0, 0, 0.5);
		box-shadow: rgb(255 255 255 / 50%) 0px 0px 1px;
	}
`
const GalleryItem = styled.div`
	border: 1px solid white;
	transition: all 0.3s linear;
	&:hover {
		border-color: #1d1f22;
	}
`
const GalleryImage = styled.div`
	width: 80px;
	height: 80px;
	cursor: pointer;

	& img {
		width: 80px;
		height: 80px;
		object-fit: cover;
	}
`
