import React from "react"
import omit from "./omit"
export { default as withLayer } from "./withLayer"
const EMPTY: unique symbol = Symbol()
export type LayerProviderProps<State = any> = Omit<State, "children"> & {
  children?: React.ReactNode
}

export interface Layer<Value, State = void> {
  Provider: React.ComponentType<LayerProviderProps<State>>
  useLayer: () => Value
  newInstance: () => Layer<Value, State>
}

export default function liftHook<
  T extends (props: any) => any,
  Value = ReturnType<T>,
  State = Parameters<T>[0]
>(useHook: T, displayName?: string): Layer<Value, State> {
  const HooksContext = React.createContext<Value | typeof EMPTY>(EMPTY)
  if (displayName) {
    HooksContext.displayName = displayName
  } else {
    HooksContext.displayName = "Layer:" + useHook.name
  }

  function Provider(props: LayerProviderProps<State>) {
    // if (!isCSR()) {
    // 	return props.children as React.JSX.Element
    // }

    const value = useHook(omit(props, ["children"]))
    return (
      <HooksContext.Provider value={value}>
        {props.children}
      </HooksContext.Provider>
    )
  }

  function useLayer(): Value {
    // if (!isCSR() && initValue !== undefined) {
    // 	return initValue
    // }
    const value = React.useContext(HooksContext)
    if (value === EMPTY) {
      throw new Error("Component must be wrapped with <Layer.Provider>")
    }
    return value
  }

  function newInstance() {
    return liftHook(useHook)
  }
  return { Provider, useLayer, newInstance }
}
