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
						{this.props.gallery.map((item, index) => (
							<GalleryImage
								onClick={() => {
									this.changeImage(index)
								}}
								key={item}
							>
								<img src={item} alt={this.props.name} />
							</GalleryImage>
						))}
					</GalleryWrapper>
				)}
			</Gallery>
		)
	}
}

const Gallery = styled.div`
	display: flex;
	flex: 0 1 65%;
	@media (max-width: 920px) {
		flex-direction: column;
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
		@media (min-width: 920px) {
			max-height: 511px;
			flex-basis: 610px;
			min-height: 320px;
		}
	}
`

const GalleryWrapper = styled.div`
	display: grid;
	grid-auto-flow: column;
	grid-template-columns: repeat(minmax(1, 4), 80px);
	grid-template-rows: repeat(4, 80px);
	grid-row-gap: 40px;
	grid-column-gap: 20px;
	margin-top: 20px;
	@media (min-width: 920px) {
		margin-top: 0px;
		margin-right: 40px;
	}
	@media (max-width: 920px) {
		flex-wrap: wrap;
		display: flex;
		justify-content: center;
		/*grid-template-columns: repeat(auto-fit, minmax(80px, 80px));

		grid-template-rows: 1fr;*/
	}
`

const GalleryImage = styled.div`
	transition: all 0.3s linear;
	width: 80px;
	height: 80px;
	border: 1px solid white;
	cursor: pointer;
	&:hover {
		border-color: #1d1f22;
	}
	& img {
		padding: 3px;
		width: 80px;
		height: 80px;
		object-fit: cover;
	}
`
