import { useEffect, useState, useContext } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

// Components
import Banner from '../components/banner'
import Card from '../components/card'

// Lib
import { fetchCoffeeStores } from '../lib/coffee-stores'

// Hooks
import useTrackLocation from '../hooks/useTrackLocation'

// Context
import StoreContext from '../store/StoreContext'

import { ACTION_TYPES } from '../store/StoreReducer'

export async function getStaticProps(context) {
	const coffeeStores = await fetchCoffeeStores()
	return {
		props: { coffeeStores }, // will be passed to the page component as props
	}
}

// export default function Home({ coffeeStores }) {
export default function Home(props) {
	const { state, dispatch } = useContext(StoreContext)

	// const latLong = state.latLong
	// const coffeeStoresNearMe = state.coffeeStores
	const { coffeeStores, latLong } = state
	const coffeeStoresNearMe = coffeeStores

	const { handleTrackLocation, locationErrorMsg, isFindingLocation } =
		useTrackLocation()

	// const [coffeeStoresNearMe, setCoffeeStoresNearMe] = useState('')
	const [coffeeStoresNearMeError, setCoffeeStoresNearMeError] = useState(null)

	const limit = 30

	useEffect(() => {
		if (latLong) {
			try {
				const getCoffeeStores = async () => {
					const res = await fetch(
						`/api/getCoffeeStoresByLocation?latLong=${latLong}&limit=${limit}`,
					)
					// need to get the response json. (res.json)
					const coffeeStores = await res.json()
					dispatch({
						type: ACTION_TYPES.SET_COFFEE_STORES,
						payload: { coffeeStores: coffeeStores },
					})
					setCoffeeStoresNearMeError('')
				}
				getCoffeeStores()
			} catch (error) {
				setCoffeeStoresNearMeError(error.message)
			}
		}
	}, [latLong, dispatch])

	const handleOnBannerBtnClick = () => {
		handleTrackLocation()
	}
	return (
		<div className={styles.container}>
			<Head>
				<title>Coffee Finder</title>
				<meta
					name='description'
					content='Find the best coffee shop near you.'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>
				<Banner
					buttonText={isFindingLocation ? 'Locating...' : 'View stores nearby'}
					handleOnClick={handleOnBannerBtnClick}
				/>
				{locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
				{coffeeStoresNearMeError && (
					<p>Something went wrong: {coffeeStoresNearMeError}</p>
				)}

				<div className={styles.heroImage}>
					<Image
						src='/static/hero-image.png'
						width={700}
						height={400}
						alt='Coffee Conneisseur'
					/>
				</div>
				{coffeeStoresNearMe.length > 0 && (
					<div className={styles.sectionWrapper}>
						<h2 className={styles.heading2}>Stores near me</h2>
						<div className={styles.cardLayout}>
							{coffeeStoresNearMe.map((coffeeStore) => (
								<Card
									key={coffeeStore.id}
									name={coffeeStore.name}
									imgUrl={coffeeStore.imgUrl}
									href={`/coffee-store/${coffeeStore.id}`}
									className={styles.card}
								/>
							))}
						</div>
					</div>
				)}
				{props.coffeeStores.length > 0 && (
					<div className={styles.sectionWrapper}>
						<h2 className={styles.heading2}>Nishi Kawaguchi Stores</h2>
						<div className={styles.cardLayout}>
							{props.coffeeStores.map((coffeeStore) => (
								<Card
									key={coffeeStore.id}
									name={coffeeStore.name}
									imgUrl={coffeeStore.imgUrl}
									href={`/coffee-store/${coffeeStore.id}`}
									className={styles.card}
								/>
							))}
						</div>
					</div>
				)}
			</main>
		</div>
	)
}
