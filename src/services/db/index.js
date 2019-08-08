const context = require('./' + process.env.DB).context
const connect = require('./' + process.env.DB).connect
const addRecord = require('./' + process.env.DB).addRecord
const getRecord = require('./' + process.env.DB).getRecord
const getRecords = require('./' + process.env.DB).getRecords
const updateRecord = require('./' + process.env.DB).updateRecord
const deleteRecord = require('./' + process.env.DB).deleteRecord

module.exports = {
  context,
  connect,
  addRecord,
  getRecord,
  getRecords,
  updateRecord,
  deleteRecord
}
