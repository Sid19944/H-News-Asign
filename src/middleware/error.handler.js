class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  const message = err.message || "Internal Server Error";
  const statusCode = err.statusCode || 500;

  if (err instanceof Error) {
    message = err.errors
      ? Object.values(err.errors)
          .map((err) => err.message)
          .join(",")
      : err.message;

    if (err.code == 11000) {
      message = "Duplicate field value entered";
      statusCode = 400;
    }
  }

  return res.status(statusCode).json({
    success: true,
    message,
  });
};

export default ErrorHandler;
