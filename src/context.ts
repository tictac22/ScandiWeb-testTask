import React from "react"

interface IBodyContext {
	handleBag: (cb: () => void, active: boolean) => boolean | undefined
	test: string
}
export const BodyContext = React.createContext<IBodyContext | null>(null)
