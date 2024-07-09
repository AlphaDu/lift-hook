import { Model } from "./liftHook"
import { memo, FC } from "react"
import React from "react"

const withLayer = <T extends Model<any, void>[]>(...Models: T) => <P extends {}, >(Cmp: FC<P>) => {
	const Ret = (props: P) => {
		const Reduced = Models.reduce((Acc, Before, index) => {
			const { Provider } = Before
			return (props: P) => <Provider>
				<Acc {...props} />
			</Provider>
		}, Cmp)
		return (
			<>
				<Reduced {...props} />
			</>
		)
	}
	return memo(Ret)
}

export default withLayer
