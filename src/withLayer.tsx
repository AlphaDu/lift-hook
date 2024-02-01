import { Model } from "./liftHook"
import {ComponentType, JSX } from "react"
import React from "react"
const withLayer = <T extends Model<any, any>>(Model: T) => <P extends JSX.IntrinsicAttributes>(Cmp: ComponentType<P>) => {
	const Ret = (props: P) => {
		return (
			<Model.Provider >
				<Cmp {...props} />
			</Model.Provider>
		)
	}
	return Ret
}

export default withLayer
