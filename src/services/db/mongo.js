// Implementation of the database interface

// Require the Mongo node module
const MongoClient = require('mongodb').MongoClient
const mongoOptions = { useNewUrlParser: true }

// A context variable to store the current connection
const context = {
  db: null
}

// Connect to a database
const connect = () => {
  // Promise to suppor async / await pattern
  return new Promise((resolve, reject) => {
    // If there already is a database connection return the connection
    if (context.db) {
      resolve()
    } else {
      // Else connect to the database via the connection string enviormental variable
      new MongoClient(process.env.DB_CONN, mongoOptions).connect()
        .then((client) => {
          context.db = client.db(process.env.DB_NAME)
          console.log('Connected to ' + process.env.DB_NAME + ' DB.')
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

// Get all the records tht match the query criteria from the db
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

// Replace a record in the db
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

// Delete a record in the db
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

// Export the interface
module.exports = {
  context,
  connect,
  addRecord,
  getRecord,
  getRecords,
  updateRecord,
  deleteRecord
}
