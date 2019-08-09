// Calculator interface nd implementation for calcualting the invoice charges

const secondsPerHour = 3600

// Calculate seconds to an hourly rate
const calculateCharge = (seconds, rate) => {
  return (seconds / secondsPerHour) * rate
}

// Transform an invoice by adding line item entry charges and a total
const calculateInvoice = (invoice, billedRate) => {
  let total = 0
  // Loop through the line items to calculate charges and add to the total
  invoice.lineItems.forEach(entry => {
    entry.charge = calculateCharge(entry.duration, billedRate)
    total += entry.charge
  })
  invoice.amountBilled = total
  // Return the transformed invoice
  return invoice
}

// Export the interface
module.exports = {
  calculateCharge,
  calculateInvoice
}
