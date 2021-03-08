const conn = require('../index')

const getOrders = async (req, res, next) => {
  const { user_id } = req.params;

  try {
    const dbRes = await conn.query(`
    select o.id as order_id, order_time, estimate_delivery, p.id as payment_id, amount, payment_mode, payment_status from orders as o
    inner join payments as p on(o.payment_id = p.id)
    where o.user_id = ?`, [user_id])

    res.status(200).json(dbRes['0'])
  } catch(err) { next(err) }

}

module.exports = Object.freeze({ getOrders })
