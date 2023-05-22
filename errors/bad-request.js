const { CustomError } = require('./custom')

class BadRequestError extends CustomError {
  statusCode = 400
  constructor () {
    super('Route not found')
    Object.setPrototypeOf(this, BadRequestError)
  }

  serializeErrors () {
    return [
      {
        message: 'Not found'
      }
    ]
  }
}

module.exports = {
  BadRequestError
}
