import {
	table,
	getMinifiedRecords,
	findRecordByFilter,
} from '../../lib/airtable'

const createCoffeeStore = async (req, res) => {
	const { id, name, address, neighbourhood, voting, imgUrl } = req.body
	if (req.method === 'POST') {
		try {
			if (id) {
				// Find a record
				const records = await findRecordByFilter(id)
				if (records.length !== 0) {
					res.status(200)
					res.json(records)
				} else {
					// Create a record
					if (name) {
						const createRecords = await table.create([
							{
								fields: {
									id,
									name,
									address,
									neighbourhood,
									voting,
									imgUrl,
								},
							},
						])
						const records = getMinifiedRecords(createRecords)
						res.status(201)
						res.json(records)
					} else {
						res.status(400)
						res.json({ message: 'ID or Name is missing' })
					}
				}
			} else {
				res.status(400)
				res.json({ message: 'ID is missing' })
			}
		} catch (err) {
			console.error('Error creating or finding a store', err)
			res.status(500)
			res.json({ message: 'Error creating or finding a store', err })
		}
	}
}
export default createCoffeeStore
