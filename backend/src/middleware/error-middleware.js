export function errorHandler(err, req, res, next) {
  console.error('ERROR:', err);

  // Default status code
  const status = err.status || 500;

  // If it's a custom error, use its message
  const message = err.message || 'Internal server error';

  res.status(status).json({
    success: false,
    message,
  });
}