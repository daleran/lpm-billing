const Ajv = require('ajv')
const ajv = new Ajv({ allErrors: true })

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
const validateGenerateInvoiceIn = ajv.compile(generateInvoiceIn)

module.exports = {
  validateGenerateInvoiceIn
}
