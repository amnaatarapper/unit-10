const bycryptjs = require('bcryptjs');
const auth = require('basic-auth');
// SEQUELIZE
const db = require('./db');
const {
	User
} = db.models;

// Authentification middleware

const authentification = async (req, res, next) => {
  // Holds errors
  let message; 
    // Parse the user's credentials from the Authorization header.
  const credentials = auth(req);

  // If Auth header exists
    // Compare it against the db
  if(credentials) {
    const user = await User.findOne({
      where: {
        emailAddress: credentials.name
      }
    });
    // If provided credentials password matches the db entry the user is authentificated
    if (user) {
      const authentificated = bycryptjs.compare(credentials.pass, user.password);
      if (authentificated) {
          req.currentUser = user;
          console.log(`Authentication successful for username: ${user.emailAddress}`);
      }  else {
        message = `Authentication failure for username: ${user.emailAddress}`;
      }
    } else {
      message = `User not found for username: ${credentials.emailAddress}`;
    }
  } else {
    message = 'Auth header not found';
  }

  // if message variable holds any errors, access is denied
  if (message) {
    console.warn(message);
    res.status(401).json({ message: 'Access Denied' });
  } else {
    next();
  }
}; 

module.exports = authentification;