const notFound = (req, res) => res.status(400).send('Route not found');

module.exports = notFound;
