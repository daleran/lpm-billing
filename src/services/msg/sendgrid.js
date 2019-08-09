// Set up the sendGrid SMTP client
const emailer = require('@sendgrid/mail')
emailer.setApiKey(process.env.SENDGRID_API_KEY)

// Build a plain text message
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

// Build an HTML Message
const buildMessageHTML = (client, invoice) => {
  let message = `<h1>Lion Services Invoice</h1>` +
  `<h2>Invoice#: ${invoice._id}</h2>` +
  `<h3>Billing Cycle: ${invoice.billingCycleStart.substring(0, 9)} to ${invoice.billingCycleEnd.substring(0, 9)}</h4>` +
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
    message += `<tr>\n<td>${item.start.substring(0, 9)}</td>\n<td>${item.description}</td>\n<td>${(item.duration / 3600)} hours</td>\n<td>$${client.billedRate}</td>\n<td>$${item.charge}</td>\n</tr>`
  })
  message += `</table>`
  message += `\n <p>Total Due: $${invoice.amountBilled}</p>`
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
