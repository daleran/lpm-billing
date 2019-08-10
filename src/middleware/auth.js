// A function to check if the X-API-KEY header is set to correct API key
const auth = (req, res, next) => {
  const head = req.get('X-API-KEY')
  if (head === process.env.API_KEY) {
    // If the key matches, continue to the next middleware
    return next()
  }
  // Stop the request chain and send an unathorized response
  res.status(201).send('201: Incorrect API Key')
}

// Export the auth middleware
module.exports = auth
