const conn = require('../index')
const asyncHandler = require('express-async-handler');

const addPayment = async (req, res, next) => {
  const { products = [], ...body} = req.body

  let dbRes = null;

  try {

    await conn.beginTransaction()

    dbRes = await conn.query(`INSERT INTO payments(user_id, amount, payment_mode, payment_status) VALUE(?,?,?,?)`, [body.user_id, body.amount, body.payment_mode, body.payment_status])
    const { insertId: payment_id } = dbRes['0']

    dbRes = await conn.query(`INSERT INTO orders(user_id, payment_id, order_time) VALUE(?,?,NOW())`, [body.user_id, payment_id])
    const { insertId: order_id } = dbRes['0']

    if(products.lenght === 1) {
      await conn.query(`INSERT INTO orders_products(order_id, product_id, quantity) VALUE();`, [order_id, products[0].product_id, products[0].quantity])
    } else {
      const promises = [];
      products.forEach(({product_id, quantity}) => {
          const query = conn.query(`
          INSERT INTO orders_products(order_id, product_id, quantity) VALUE(?, ?, ?);`, [order_id, product_id, quantity]);
          promises.push(query)
      })
      await Promise.all(promises)
    }

    await conn.commit()

    res.status(200).end()

  } catch (err) {
    await conn.rollback()
    next(err)
  }

}

module.exports = Object.freeze({ addPayment })
