import React from "react"
import styled from "styled-components"
import { Props } from "./attributesItems"

export class AttributesItems extends React.Component<Props> {
	render() {
		return (
			<>
				{this.props.attributes.length !== 0 &&
					this.props.attributes.map((item) => (
						<Wrapper key={item.name}>
							<AttributeTitle>{item.name}:</AttributeTitle>
							<AttributeItemsWrapper>
								{item.items.map((values) =>
									item.type === "swatch" ? (
										<AttributeSwatchItems
											key={values.displayValue}
											selected={
												this.props.stateAttributes.find(
													(attrItem) => attrItem.value === values.value
												) && this.props.inStock
													? true
													: false
											}
											isAvaible={this.props.inStock}
											onClick={(e: React.MouseEvent) =>
												this.props.inStock && this.props.handleAttribute
													? this.props.handleAttribute(e, item.name, values.value)
													: ""
											}
											color={values.value}
										>
											<div></div>
										</AttributeSwatchItems>
									) : (
										<AttributeItems
											key={values.displayValue}
											selected={
												this.props.stateAttributes.find(
													(attrItem) =>
														attrItem.value === values.value && attrItem.name === item.name
												) && this.props.inStock
													? true
													: false
											}
											isAvaible={this.props.inStock}
											onClick={(e: React.MouseEvent) =>
												this.props.inStock && this.props.handleAttribute
													? this.props.handleAttribute(e, item.name, values.value)
													: ""
											}
										>
											{values.value}
										</AttributeItems>
									)
								)}
							</AttributeItemsWrapper>
						</Wrapper>
					))}
			</>
		)
	}
}

const AttributeTitle = styled.p``

const AttributeItemsWrapper = styled.div`
	display: flex;
`

interface IAttributeSwatchItems {
	color: string
	selected: boolean
	isAvaible: boolean
}
const Wrapper = styled.div`
	margin-top: 20px;
`
const AttributeSwatchItems = styled.div<IAttributeSwatchItems>`
	margin-top: 10px;
	margin-left: 10px;
	padding: 2px;
	border: ${(props) => (props.selected ? "1px solid #5ece7b" : "1px solid white")};
	&:hover {
		border-color: ${(props) => (props.isAvaible ? "#4bac65" : "white")};
	}
	& div {
		width: 20px;
		height: 20px;
		background-color: ${(props) => (props.color === "#FFFFFF" ? "#e4e4e4" : props.color)};
	}
`

interface IAttributeItems {
	selected: boolean
	isAvaible: boolean
}
const AttributeItems = styled.div<IAttributeItems>`
	margin-left: 24px;
	margin-top: 10px;
	cursor: pointer;
	border: 1px solid black;
	padding: 13px;
	color: ${(props) => (props.selected ? "white" : "black")};
	background-color: ${(props) => (props.selected ? "black" : "white")};
	width: 24px;
	height: 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 14px;
	flex: 1 1 50%;
	&:hover {
		background-color: ${(props) => (props.isAvaible ? "#ececec" : "none")};
	}
`
