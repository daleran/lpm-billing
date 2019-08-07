const services = require('./services')
const dbService = services.db

const testDb = async () => {
  try {
    await dbService.connect()
    const result = await dbService.addRecord('clients', { test: 'test' })
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}

module.exports = testDb
