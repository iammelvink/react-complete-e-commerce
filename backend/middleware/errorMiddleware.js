// Error middleware for 404
const notFound = (req, res, next) => {
	const error = new Error(`Not found - ${req.originalUrl}`)
	res.status(404)
	next(error)
}

// Error handler middleware
const errorHandler = (err, req, res, next) => {
	// if res.statusCode = 200
	// Make it 500
	// Else leave it as is
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode
	res.status(statusCode)
	res.json({
		message: err.message,
		// Set stack to null if in production mode
		// Else send the err.stack trace
		stack: process.env.NODE_ENV === 'production' ? null : err.stack,
	})
}

export { notFound, errorHandler }
