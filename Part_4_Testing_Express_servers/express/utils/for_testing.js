//couple of simple functions that will be used for testing purposes
const reverse = (string) => {
    return string
      .split('')
      .reverse()
      .join('')
  }
  
  const average = (array) => {
    const reducer = (sum, item) => {
      return sum + item
    }
    
    //check for an empty array 
    return array.length === 0 ? 0 : array.reduce(reducer, 0) / array.length
  }
  
  module.exports = {
    reverse,
    average,
  }