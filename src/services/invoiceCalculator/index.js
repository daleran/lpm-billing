const milisecondsPerHour = 3600000

const calculateCharge = (miliseconds, rate) => {
  return (miliseconds / milisecondsPerHour) * rate
}

const calculateInvoice = (invoice, billedRate) => {
  let total = 0
  invoice.lineItems.forEach(entry => {
    entry.charge = calculateCharge(entry.duration, billedRate)
    total += entry.charge
  })
  invoice.total = total
}

module.exports = {
  calculateCharge,
  calculateInvoice
}
