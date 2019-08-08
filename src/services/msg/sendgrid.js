const emailer = require('@sendgrid/mail')
emailer.setApiKey(process.env.SENDGRID_API_KEY)

const buildMessagePlainText = (client, invoice) => {
  let message = `Lion Services Invoice \n` +
  `Invoice#: ${invoice._id} \n` +
  `Billing Cycle: ${invoice.billingCycleStart.substring(0, 9)} to ${invoice.billingCycleEnd.substring(0, 9)} \n` +
  `\n` +
  `Bill TO \n` +
  `NAME: ${client.name} \n` +
  `ID: ${client._id} \n` +
  `EMAIL: ${client.email} \n` +
  `\n` +
  `DATE \t DESCRIPTION \t HOURS \t RATE \t CHARGE`

  invoice.lineItems.forEach(item => {
    message += `${item.start.substring(0, 9)} \t ${item.description} \t ${(item.duration / 3600)} hours at $${client.billedRate} \t $${item.charge} \n`
  })
  message += `\n Total Due: $${invoice.amountBilled}`
  return message
}

const send = async (client, invoice) => {
  const email = {
    to: client.email,
    from: 'lpmbilling@seandavis.dev',
    subject: `Lion Service Invoice ${invoice._id}`,
    text: buildMessagePlainText(client, invoice)
  }
  return emailer.send(email)
}

module.exports = {
  send
}
