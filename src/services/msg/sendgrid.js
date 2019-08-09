// Set up the sendGrid SMTP client
const emailer = require('@sendgrid/mail')
emailer.setApiKey(process.env.SENDGRID_API_KEY)

// Build a plain text message
const buildMessagePlainText = (client, invoice) => {
  let message = `Lion Services Invoice \n` +
  `Invoice#: ${invoice._id} \n` +
  `Billing Cycle: ${invoice.billingCycleStart.substring(0, 10)} to ${invoice.billingCycleEnd.substring(0, 10)} \n` +
  `\n` +
  `Bill TO \n` +
  `NAME: ${client.name} \n` +
  `ID: ${client._id} \n` +
  `EMAIL: ${client.email} \n` +
  `\n` +
  `DATE \t DESCRIPTION \t HOURS \t RATE \t CHARGE`

  invoice.lineItems.forEach(item => {
    message += `${item.start.substring(0, 10)} \t ${item.description} \t ${(item.duration / 3600).toFixed(2)} hours at $${client.billedRate.toFixed(2)} \t $${item.charge.toFixed(2)} \n`
  })
  message += `\n Total Due: $${invoice.amountBilled.toFixed(2)}`
  return message
}

// Build an HTML Message
const buildMessageHTML = (client, invoice) => {
  let message = `<h1>Lion Services Invoice</h1>` +
  `<h2>Invoice#: ${invoice._id}</h2>` +
  `<h3>Billing Cycle: ${invoice.billingCycleStart.substring(0, 10)} to ${invoice.billingCycleEnd.substring(0, 10)}</h4>` +
  `<br>` +
  `<h3>Bill TO</h3>` +
  `<p>NAME: ${client.name}</p>` +
  `<p>ID: ${client._id}</p>` +
  `<p>EMAIL: ${client.email}</p>` +
  `<br>` +
  `<table>` +
  `<tr>` +
  `<th>DATE</th> <th>DESCRIPTION</th> <th>HOURS</th> <th>RATE</th> <th>CHARGE</th>` +
  `</tr>`

  invoice.lineItems.forEach(item => {
    message += `<tr>\n<td>${item.start.substring(0, 10)}</td>\n<td>${item.description}</td>\n<td>${(item.duration / 3600).toFixed(2)} hours</td>\n<td>$${client.billedRate.toFixed(2)}</td>\n<td>$${item.charge.toFixed(2)}</td>\n</tr>`
  })
  message += `</table>`
  message += `\n <p>Total Due: $${invoice.amountBilled.toFixed(2)}</p>`
  return message
}

// Asyncrnously send the message to the client
const send = async (client, invoice) => {
  // Email structure
  const email = {
    to: client.email,
    from: 'lpmbilling@seandavis.dev',
    subject: `Lion Service Invoice ${invoice._id}`,
    text: buildMessagePlainText(client, invoice),
    html: buildMessageHTML(client, invoice)
  }
  // Send the email
  return emailer.send(email)
}

// Expose the interface
module.exports = {
  send
}
