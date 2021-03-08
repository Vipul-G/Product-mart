const jwt = require('jsonwebtoken')
const config = require('../config')


module.exports = (req, res, next) => {
  // if not contain tocken then it might fail
  try {
    const token =  req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, config.jwt.secretKey);
    req.user = { id: decodedToken.id, email: decodedToken.email,
      name: decodedToken.name, contact: decodedToken.contact, address: decodedToken.address, role: decodedToken.role};
    next();
  } catch(error) {
    console.log({error})
    res.status(401).json({ message: error.message });
  }
};
