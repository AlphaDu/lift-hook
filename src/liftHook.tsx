import React from "react"
import omit from "./omit"
import isCSR from "./isCSR"
const EMPTY: unique symbol = Symbol()
export type ModelProviderProps<State = any> = Omit<State, "children"> & {
	children?: React.ReactNode
}

export interface Model<Value, State = void> {
	Provider: React.ComponentType<ModelProviderProps<State>>
	useContainer: () => Value | undefined
	newInstance: () => Model<Value, State>
}

export default function createContainer<
	T extends (props: any) => any,
	Value = ReturnType<T>,
	State = Parameters<T>[0]
>(useHook: T, displayName?: string): Model<Value, State> {
	const HooksContext = React.createContext<Value | typeof EMPTY>(EMPTY)
	HooksContext.displayName = displayName

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

	function useContainer(initValue?: Value): Value | undefined {
		if (!isCSR()) {
			return initValue
		}
		const value = React.useContext(HooksContext)
		if (value === EMPTY) {
			console.error("Component must be wrapped with <Model.Provider>")
			return initValue
		}
		return value
	}

	function newInstance() {
		return createContainer(useHook)
	}
	return { Provider, useContainer, newInstance }
}
