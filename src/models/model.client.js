const Ajv = require('ajv')
const ajv = new Ajv({ allErrors: true })

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
const validatePostClientIn = ajv.compile(postClientIn)

module.exports = {
  validatePostClientIn
}
