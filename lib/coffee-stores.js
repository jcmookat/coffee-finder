//initialize unsplash
import { createApi } from 'unsplash-js'

const unsplashApi = createApi({
	accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
})

const getUrlForCoffeeStores = (latlong, query, limit) => {
	return `https://api.foursquare.com/v3/places/nearby?ll=${latlong}&query=${query}&limit=${limit}`
}

const getListOfCoffeeStorePhotos = async () => {
	const photos = await unsplashApi.search.getPhotos({
		query: 'coffee shop',
		perPage: 40,
		orientation: 'landscape',
	})

	const unsplashResults = photos.response.results

	return unsplashResults.map((result) => result.urls['small'])
}

export const fetchCoffeeStores = async (
	latlong = '35.81553470317177,139.70469869467803',
	query = 'coffee stores',
	limit = 6,
) => {
	const photos = await getListOfCoffeeStorePhotos()

	const response = await fetch(getUrlForCoffeeStores(latlong, query, limit), {
		headers: {
			Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
		},
	})

	const data = await response.json()

	return (
		data.results?.map((venue, idx) => {
			const neighbourhood = venue.location.neighborhood
			return {
				id: venue.fsq_id,
				address: venue.location.address || '',
				name: venue.name,
				neighbourhood:
					(neighbourhood && neighbourhood.length > 0 && neighbourhood[0]) ||
					venue.location.cross_street ||
					'',
				imgUrl: photos[idx],
			}
		}) || []
	)
}
