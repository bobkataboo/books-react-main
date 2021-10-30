// https://codemotion.quip.com/JcLsAiVPaMh5
import customLocalStorage from "./customLocalStorage"

function setObject(key, value) {
	if (value === undefined) return
	// eslint-disable-next-line no-param-reassign
	value = JSON.stringify(value)
	customLocalStorage.setItem(key, value)
	return value
}

export const storage = {
	set(key, value) {
		customLocalStorage.setItem(key, value)
		return String(value)
	},
	get(key, defaultValue = false) {
		let value = customLocalStorage.getItem(key)
		if (value === undefined || value === null) return defaultValue
		if (value === 'true' || value === 'false') value = JSON.parse(value)
		return value
	},
	setObject,
	getObject(key, defaultObject = {}) {
		try {
			return JSON.parse(customLocalStorage.getItem(key)) || defaultObject
		} catch (er) {
			return defaultObject
		}
	},
	getOrCreateObject(key, value) {
		let result = JSON.parse(customLocalStorage.getItem(key))

		if (!result) {
			result = value
		}

		return result
	},
	setArray: setObject,
	getArray(key) {
		return JSON.parse(customLocalStorage.getItem(key)) || []
	},
	remove(key) {
		return customLocalStorage.removeItem(key)
	},
	clear() {
		return customLocalStorage.clear()
	},
}

export default storage