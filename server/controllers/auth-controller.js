const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcrypt');
// const User = require('../models/user.model');
const conn = require('../index')
const asyncHandler = require('express-async-handler');

function generateToken(user) {
  if(!user) {return}

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    contact: user.contact,
    address: user.address,
    role: user.role
  };
  const options = {
    expiresIn: config.jwt.expiresIn
  };
  return {
    token: jwt.sign(payload, config.jwt.secretKey, options),
    expires: config.jwt.expiresIn
  };
}

const insert = asyncHandler(async (user) => {

    user.hashedPassword = bcrypt
    .hashSync(user.password, 10);
    delete user.password;

    console.log('saving user to db', user);

    const dbResponse = await conn.execute(`INSERT INTO USERS (name, contact, email, address, hash_password)
    VALUES (?, ?, ?, ?, ?)`, [user.name, user.contact, user.email, user.address, user.hashedPassword])

});

const getUserByContactAndPassword = asyncHandler( async (contact, password) => {
  let user = (await conn.execute(
    `SELECT * FROM users WHERE contact = ? `, [contact]))[0][0];

  if(isUserValid(user, password)) {
    delete user.hash_password;
    return user;
  } else {
    return null;
  }
});


const getUserByContact = asyncHandler( async (contact) => {
  if(!contact) { return }
  const user = (await conn.execute(`SELECT * FROM users WHERE contact = ?`, [contact]))[0][0];
  if(!user) {
    return null;
  }
  delete user.hash_password;
  return user;
});

  function isUserValid(user, password) {
    return user && bcrypt.compareSync(password, user.hash_password);
  }

module.exports = {
  generateToken,
  insert,
  getUserByContactAndPassword,
  getUserByContact
};
