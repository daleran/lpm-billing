// JSON Schema validation middleware
const Ajv = require('ajv')
const ajv = new Ajv({ allErrors: true })

// JSON Schema for enforcing a new client being added to the system
const postClientIn = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      maxLength: 128
    },
    email: {
      type: 'string',
      format: 'email'
    },
    billedRate: {
      type: 'number',
      minimum: 0
    }
  },
  required: ['name', 'email', 'billedRate']
}
// Compile the JSON validation functions with ajv
const validatePostClientIn = ajv.compile(postClientIn)

// JSON Schema for a provided clioent object to be updated
const updateClientIn = {
  type: 'object',
  properties: {
    _id: {
      type: 'number'
    },
    name: {
      type: 'string',
      maxLength: 128
    },
    email: {
      type: 'string',
      format: 'email'
    },
    billedRate: {
      type: 'number',
      minimum: 0
    }
  },
  required: ['_id', 'name', 'email', 'billedRate']
}
// Compile the JSON validation functions with ajv
const validateUpdateClientIn = ajv.compile(updateClientIn)

// Export the validation functions
module.exports = {
  validatePostClientIn,
  validateUpdateClientIn
}
