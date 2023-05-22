class CustomError extends Error {
  statusCode
  constructor (message) {
    super(message)
    Object.setPrototypeOf(this, CustomError)
  }

  serializeErrors (field) {
    return [
      {
        message: this.message,
        field
      }
    ]
  }
}

module.exports = { CustomError }
