interface Item {
	displayValue: string
	value: string
}
interface Attribute {
	name: string
	type: string
	items: Item[]
}
interface AttributeState {
	name: string
	selected: boolean
	value: string
	type: string
	items: Item[]
}
type handleNull = null
type handleFunction = (e: React.MouseEvent, name: string, value: string) => void

export interface Props {
	attributes: Attribute[]
	stateAttributes: AttributeState[]
	inStock: boolean
	handleAttribute: handleFunction | handleNull
}
