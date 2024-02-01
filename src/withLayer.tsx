import { Model } from "./liftHook"
import { ComponentType,} from "react"
import React from "react"

const withLayer = <T extends Model<any, any>, P extends {},C extends ComponentType<P>>(Model: T) => (Cmp: C) => {
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
