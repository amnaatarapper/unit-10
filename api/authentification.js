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
      const authentificated = bycryptjs.compareSync(credentials.pass, user.password);
      if (authentificated) {
          req.currentUser = user;
          console.log(`Authentication successful for username: ${user.emailAddress}`);
      }  else {
        message = `Wrong username or password`;
      }
    } else {
      message = `User not found`;
    }
  } else {
    message = 'Auth header not found';
  }

  // if message variable holds any errors, access is denied
  if (message) {
    console.warn(message);
    res.status(401).json({
      errors: [message]
    });
  } else {
    next();
  }
}; 

module.exports = authentification;