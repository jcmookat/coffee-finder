import {
	table,
	findRecordByFilter,
	getMinifiedRecords,
} from '../../lib/airtable'

const favouriteCoffeeStoreById = async (req, res) => {
	if (req.method === 'PUT') {
		try {
			const { id } = req.body
			if (id) {
				// Find a record
				const records = await findRecordByFilter(id)
				if (records.length !== 0) {
					const record = records[0]

					const calculateVoting = parseInt(record.voting) + 1

					//update a record
					const updateRecord = await table.update([
						{
							id: record.recordId,
							fields: {
								voting: calculateVoting,
							},
						},
					])
					if (updateRecord) {
						const minifiedRecords = getMinifiedRecords(updateRecord)
						res.status(200)
						res.json(minifiedRecords)
					}
				} else {
					res.json({ message: 'Coffee store does not exist', id })
				}
			} else {
				res.status(400)
				res.json({ message: 'ID is missing' })
			}
		} catch (error) {
			res.status(500)
			res.json({ message: 'Error upvoting coffee store', error })
		}
	} else {
		res.json({ message: 'EIR' })
	}
}
export default favouriteCoffeeStoreById
