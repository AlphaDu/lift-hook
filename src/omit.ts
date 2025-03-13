const omit = <T extends object, K extends keyof T>(
	obj: T,
	keys: Array<K>,
): Omit<T, K> => {
	// remove keys from obj
	const newObj = { ...obj }
	keys.forEach((key) => {
		delete newObj[key]
	})
	return newObj
}

export default omit
