import '../styles/globals.css'

//Context
import { StoreProvider } from '../store/StoreContext'

function MyApp({ Component, pageProps }) {
	return (
		<>
			<StoreProvider>
				<Component {...pageProps} />
			</StoreProvider>
		</>
	)
}

export default MyApp
