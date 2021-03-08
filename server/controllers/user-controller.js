const conn = require('../index')

const getUsers = async (req, res, next) => {

  try {
    const [dbRes] = await conn.query(`SELECT id, name, contact, email, address, role FROM users WHERE role != 'admin'`)

    res.status(200).json(dbRes)
  } catch (err) {
    next(err)
  }

}

const deleteUser = async (req, res, next) => {
  try {

    const { user_id } = req.params

    await conn.query(`DELETE FROM users WHERE id = ?`, [user_id])

    res.status(200).end()

  } catch (err) {
    next(err)
  }
}

module.exports = Object.freeze({ getUsers, deleteUser })
