const { CustomError } = require('./custom')

class NotFoundError extends CustomError {
  statusCode = 404
  constructor (message) {
    super(message)
    Object.setPrototypeOf(this, NotFoundError)
  }

  serializeErrors () {
    return [
      {
        message: this.message
      }
    ]
  }
}

module.exports = {
  NotFoundError
}
