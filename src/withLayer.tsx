import { Model } from "./liftHook"
import { memo, FC } from "react"
import React from "react"

const withLayer = <T extends Model<any, void>>(...Models: T[]) => <P extends {},>(Cmp: FC<P>) => {
	const Ret = (props: P) => {
		return (
			<>
				{Models.reduce((acc, Model) => {
					const { Provider } = Model
					return <Provider>{acc}</Provider>
				}, <Cmp {...props} />)}
			</>
		)
	}
	return memo(Ret)
}

export default withLayer
