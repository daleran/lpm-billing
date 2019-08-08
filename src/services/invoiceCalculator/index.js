const secondsPerHour = 3600

const calculateCharge = (seconds, rate) => {
  return (seconds / secondsPerHour) * rate
}

const calculateInvoice = (invoice, billedRate) => {
  let total = 0
  invoice.lineItems.forEach(entry => {
    entry.charge = calculateCharge(entry.duration, billedRate)
    total += entry.charge
  })
  invoice.amountBilled = total
  return invoice
}

module.exports = {
  calculateCharge,
  calculateInvoice
}
