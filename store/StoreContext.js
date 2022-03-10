import { createContext, useReducer } from 'react'
import storeReducer from './StoreReducer'

const StoreContext = createContext()

export const StoreProvider = ({ children }) => {
	const initialState = {
		latLong: '',
		coffeeStores: [],
	}

	const [state, dispatch] = useReducer(storeReducer, initialState)
	return (
		<StoreContext.Provider value={{ state, dispatch }}>
			{children}
		</StoreContext.Provider>
	)
}

export default StoreContext
