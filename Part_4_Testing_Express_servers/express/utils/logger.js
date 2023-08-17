//separate all printing to the console to its own module utils/logger.js

const info = (...params) => {
  if ( process.env.NODE_ENV !== 'test'){
    console.log(...params)
  }
}

const error = (...params) => {
  if ( process.env.NODE_ENV !== 'test'){
    console.error(...params)
  }
}
  module.exports = {
    info, error
  }