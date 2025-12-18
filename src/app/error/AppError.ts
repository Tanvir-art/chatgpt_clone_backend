class AppError extends Error {
  public  statusCode: number;

  constructor(statusCode: number, message: string, stack= '') {
    console.log('AppError instantiated before super', statusCode, message, stack);
    super(message);
    console.log('After super in AppError', statusCode, message, stack);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
        Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;