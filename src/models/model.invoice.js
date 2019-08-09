// JSON Schema validation middleware
const Ajv = require('ajv')
const ajv = new Ajv({ allErrors: true })

// JSON Schema for adding a new interface
const generateInvoiceIn = {
  type: 'object',
  properties: {
    clientId: {
      type: 'number'
    },
    billingCycleStart: {
      type: 'string',
      format: 'date-time'
    },
    billingCycleEnd: {
      type: 'string',
      format: 'date-time'
    }
  },
  required: ['clientId', 'billingCycleStart', 'billingCycleEnd']
}
// Compile the JSON validation functions with ajv
const validateGenerateInvoiceIn = ajv.compile(generateInvoiceIn)

// JSON Schema for updating an interface
const updateInvoiceIn = {
  type: 'object',
  properties: {
    _id: {
      type: 'string'
    },
    clientId: {
      type: 'number'
    },
    billingCycleStart: {
      type: 'string',
      format: 'date-time'
    },
    billingCycleEnd: {
      type: 'string',
      format: 'date-time'
    }
  },
  required: ['_id', 'clientId', 'billingCycleStart', 'billingCycleEnd']
}
// Compile the JSON validation functions with ajv
const validateUpdateInvoiceIn = ajv.compile(updateInvoiceIn)

// Export the validation functions
module.exports = {
  validateGenerateInvoiceIn,
  validateUpdateInvoiceIn
}
