const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require("../models/user")

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
  
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
  
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
      return response.status(400).json({ error: 'expected `username` to be unique' })
    } 
  
    next(error)
}

const tokenExtractor = (req, res, next) => {
    let authToken = req.headers['authorization']
    if(authToken && authToken.startsWith('Bearer ')) {
      authToken = authToken.replace('Bearer ', '')
      authToken = jwt.verify(authToken, process.env.SECRET)
    }
    req.token = authToken
    next()
}

const userExtractor = async (req, res, next) => {
  if(req.token) {
    const user = await User.findById(req.token.id)
    req.user = user
  }
  next()
}

module.exports = {
    requestLogger,
    errorHandler,
    tokenExtractor,
    userExtractor
}