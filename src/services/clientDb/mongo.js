const MongoClient = require('mongodb').MongoClient
let client
let db

const connect = async () => {
  try {
    client = await new MongoClient(process.env.DB_URL + process.env.DB_NAME).connect()
    console.log('Connected to ' + process.env.DB_NAME + 'on ' + process.env.DB_URL)
    db = await client.db(process.env.DB_NAME)
  } catch (error) {
    console.log(error)
  }
}
