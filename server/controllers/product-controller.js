const fs = require('fs');
const conn = require('../index')
const path = require('path');
const { isNull } = require('util');

const addProduct = async (req, res, next) => {

  try {
    const productImage =  req.files.productImages[0]
  const product = {...req.body}

  product.image_path = productImage.path.split('\\')[2]

    const dbRes = await conn.execute(`
    INSERT INTO products(name, image_path, price, available, description)
    VALUES(?, ?, ?, ?, ?)
    `, [product.name, product.image_path, product.price, product.available == 'true', product.description])

    product.id = dbRes['0'].insertId
    product.available = product.available == 'true' ? 1 : 0

    res.status(201).json(product)

  } catch(err) {
    deleteImage(path.join(__dirname, '..', 'images', product.image_path))
    next(err)
  }
}

const updateProduct = async (req, res, next) => {
  const productImage =  req.files.productImages ? req.files.productImages[0] : null
  const product = req.body
  product.image_path = productImage ? productImage.path.split('\\')[2] : product.prev_image_path

  try {

    const dbRes = await conn.execute('UPDATE products SET name = ?, price = ?, description = ?, available = ?, image_path = ? WHERE id = ?', [product.name, product.price, product.description, product.available == 'true', product.image_path, product.id]);

    if (product.image_path != product.prev_image_path) {
      deleteImage(path.join(__dirname, '..', 'images', product.prev_image_path))
    }
    delete product.prev_image_path
    product.available = product.available == 'true' ? 1 : 0
    res.status(200).json(product)
  } catch (err) {
    if (product.image_path != product.prev_image_path) {
      // image has been updated
      deleteImage(path.join(__dirname, '..', 'images', product.image_path))
    }
    next(err)
  }

}

const getProducts = async (req, res, next) => {
  try {
    const [products] = await conn.query(`SELECT * FROM products`)
    res.status(200).json(products)
  } catch(err) {
    next(err)
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    const { imagePath } = req.query

    await conn.execute('DELETE FROM products WHERE id = ?', [id])
    deleteImage(path.join(__dirname, '..', 'images', imagePath))
    res.status(200).end()
  } catch(err) {
    next(err)
  }
}

function deleteImage(filePath) {

  fs.unlink(filePath, (error) => {
    if(error) {
        console.error(error.stack);
    }
  });
}

module.exports = { addProduct, getProducts, updateProduct, deleteProduct }
