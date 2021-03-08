const conn = require('../index')

async function getCartItem(user_id, product_id) {
  const [dbRes] = await conn.execute(`
  SELECT * FROM cart WHERE user_id = ? AND product_id = ?
  `, [user_id, product_id])

  return dbRes.length ? dbRes[0] : null
}

const addToCart = async (req, res, next) => {
  const body =  req.body
  try {
    const item = await getCartItem(body.user_id, body.product_id)

    if(item) {
      await conn.execute(`
      UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?
      `, [item.quantity + 1, item.user_id, item.product_id])
    } else {

      await conn.execute(`
    INSERT INTO cart (user_id, product_id, quantity) VALUES(?, ?, ?)
  `, [body.user_id, body.product_id, body.quantity]);

    }


    res.status(201).end()

  } catch(err) {
    next(err)
  }

}

const getCartItems = async (req, res, next) => {
  const { user_id, product_id } = req.params
  let dbRes;
  try {
    if (product_id == -1) {
      dbRes = (await conn.execute(`
       SELECT id, quantity, name, image_path, price, available, description FROM cart as c
       INNER JOIN products as p on c.user_id = ? AND c.product_id = p.id;
      `, [user_id]))[0]

      dbRes = dbRes.map(cp => ({
        product: {
          id: cp.id,
          name: cp.name,
          image_path: cp.image_path,
          description: cp.description,
          available: cp.available,
          price: cp.price
        },
        quantity: cp.quantity
      }))
    } else {
      dbRes = (await conn.execute(`
       SELECT user_id, product_id, quantity, "name", image_path, price, available, description FROM cart as c
       INNER JOIN products as p on (c.user_id = ? AND c.product_id = ?) AND c.product_id = p.id;
      `, [user_id, product_id]))[0][0]
    }

    res.status(200).json(dbRes)
  } catch (err) { next(err) }

}

const updateCount = async (req, res, next) => {
  const {user_id, product_id} = req.params
  const {count} = req.body
  try {

    await conn.execute(`
      UPDATE cart SET quantity = quantity + ? WHERE user_id=? AND product_id=?
    `, [count, user_id, product_id])

    res.status(200).end()

  } catch (err) { next(err) }
}

const removeProduct = async (req, res, next) => {
  const {user_id, product_id} = req.params
  try {
    await conn.execute(`
      DELETE FROM cart WHERE user_id=? AND product_id=?
    `, [user_id, product_id])
    res.status(200).end()
  } catch (err) { next(err) }
}

module.exports = { addToCart, getCartItems, updateCount, removeProduct }
