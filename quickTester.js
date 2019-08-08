const toggl = require('./src/services/timesheets/toggl')

const test = async () => {
  const res = await toggl.getEntries({ clientId: 44780946, billingCycleStart: '2019-08-01T08:00:00.000Z', billingCycleEnd: '2019-08-14T08:00:00.000Z' })
  console.log(res)
}
test()
