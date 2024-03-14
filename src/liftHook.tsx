import React from "react"
import omit from "./omit"
import isCSR from "./isCSR"
export { default as withLayer } from "./withLayer"
const EMPTY: unique symbol = Symbol()
export type ModelProviderProps<State = any> = Omit<State, "children"> & {
	children?: React.ReactNode
}

export interface Model<Value, State = void> {
	Provider: React.ComponentType<ModelProviderProps<State>>
	useLayer: () => Value
	newInstance: () => Model<Value, State>
}

export default function createContainer<
	T extends (props: any) => any,
	Value = ReturnType<T>,
	State = Parameters<T>[0]
>(useHook: T, displayName?: string): Model<Value, State> {
	const HooksContext = React.createContext<Value | typeof EMPTY>(EMPTY)
	if (displayName) {
		HooksContext.displayName = displayName
	} else {
		HooksContext.displayName = "Layer"
	}

	function Provider(props: ModelProviderProps<State>) {
		if (!isCSR()) {
			return props.children as React.JSX.Element
		}

		const value = useHook(omit(props, ["children"]))
		return (
			<HooksContext.Provider value={value}>
				{props.children}
			</HooksContext.Provider>
		)
	}

	function useLayer(initValue?: Value): Value {
		if (!isCSR() && initValue !== undefined) {
			return initValue
		}
		const value = React.useContext(HooksContext)
		if (value === EMPTY) {
			throw new Error("Component must be wrapped with <Model.Provider>")
		}
		return value
	}

	function newInstance() {
		return createContainer(useHook)
	}
	return { Provider, useLayer, newInstance }
}
