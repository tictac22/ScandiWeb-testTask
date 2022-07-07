import React from "react"
import styled from "styled-components"
import { ModifiedAttributes } from "../../interfaces"

export class AttributesSelectedItems extends React.Component<{ attributes: ModifiedAttributes[] }> {
	render() {
		return (
			<>
				{this.props.attributes.map((item) => (
					<Wrapper key={item.name}>
						<AttributeTitle>{item.name}</AttributeTitle>
						<AttributeItemWrapper>
							{item.type === "swatch"
								? item.items.map((attributeItem) => (
										<AttributeSwatchItem
											selected={item.value === attributeItem.value}
											color={attributeItem.displayValue}
											key={`${attributeItem.displayValue} ${item.value} ${item.name}`}
										>
											<div></div>
										</AttributeSwatchItem>
								  ))
								: item.items.map((attributeItem) => (
										<AttributeItem
											selected={item.value === attributeItem.value}
											key={`${attributeItem.displayValue} ${item.value} ${item.name}`}
										>
											<p>{attributeItem.value}</p>
										</AttributeItem>
								  ))}
						</AttributeItemWrapper>
					</Wrapper>
				))}
			</>
		)
	}
}

const Wrapper = styled.div`
	margin-top: 5px;
`

const AttributeTitle = styled.p``

const AttributeItemWrapper = styled.div`
	margin-top: 8px;
	display: flex;
	align-items: center;
	& div:not(:last-child) {
		margin-right: 8px;
	}
`

interface IAttributeSwatchItem {
	selected: boolean
	color: string
}

const AttributeSwatchItem = styled.div<IAttributeSwatchItem>`
	border: 1px solid ${(props) => (props.selected ? "#5ECE7B" : "white")};

	padding: 1px;
	& div {
		width: 20px;
		height: 20px;
		font-size: 14px;

		background-color: ${(props) => (props.color === "White" ? "#e4e4e4" : props.color)};
	}
`

interface IAttributeItem {
	selected: boolean
}
const AttributeItem = styled.div<IAttributeItem>`
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
`
