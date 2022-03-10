import {
	table,
	getMinifiedRecords,
	findRecordByFilter,
} from '../../lib/airtable'

const getCoffeeStoreById = async (req, res) => {
	const { id } = req.query
	try {
		if (id) {
			// Find a record
			const records = await findRecordByFilter(id)
			if (records.length !== 0) {
				res.status(200)
				res.json(records)
			} else {
				res.json({ message: 'ID could not be found.' })
			}
		} else {
			res.status(400)
			res.json({ message: 'ID is missing' })
		}
	} catch (error) {
		console.error('Something went wrong', error)
		res.status(500)
		res.json({ message: 'Something went wrong', error })
	}
}
export default getCoffeeStoreById
