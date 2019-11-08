const products = require('./public/db/product')

const findProduct = (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = products.find(product => product.name == name)

      if (!name) {
        return reject(new Error(`Product not find`))
      }

      return resolve({
        message: `Product find.`,
        name
      })
    }, 1000)
  })
}

module.exports = findProduct
