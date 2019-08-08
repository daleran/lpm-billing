const MongoClient = require('mongodb').MongoClient
const mongoOptions = { useNewUrlParser: true }

const context = {
  db: null
}

const connect = () => {
  return new Promise((resolve, reject) => {
    if (context.db) {
      resolve()
    } else {
      new MongoClient(process.env.DB_URL + process.env.DB_NAME, mongoOptions).connect()
        .then((client) => {
          context.db = client.db(process.env.DB_NAME)
          console.log('Connected to ' + process.env.DB_NAME + ' on ' + process.env.DB_URL)
          resolve()
        })
        .catch((error) => { reject(error) })
    }
  })
}

// Adds a record that returns a promise that resolves to teh added object
const addRecord = (table, record) => {
  return new Promise((resolve, reject) => {
    context.db.collection(table).insertOne(record)
      .then((result) => {
        resolve(result.ops[0])
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// Gets a single record from the database
const getRecord = (table, recordId) => {
  return new Promise((resolve, reject) => {
    context.db.collection(table).findOne({ _id: recordId })
      .then((result) => {
        resolve(result)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const getRecords = (table, criteria) => {
  return new Promise((resolve, reject) => {
    context.db.collection(table).find(criteria).toArray()
      .then((result) => {
        resolve(result)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const updateRecord = (table, record) => {
  return new Promise((resolve, reject) => {
    context.db.collection(table).findOneAndReplace({ _id: record._id }, record)
      .then((result) => {
        resolve(record)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const deleteRecord = (table, recordId) => {
  return new Promise((resolve, reject) => {
    context.db.collection(table).findOneAndDelete({ _id: recordId })
      .then((result) => {
        resolve()
      })
      .catch((error) => {
        reject(error)
      })
  })
}

module.exports = {
  context,
  connect,
  addRecord,
  getRecord,
  getRecords,
  updateRecord,
  deleteRecord
}
