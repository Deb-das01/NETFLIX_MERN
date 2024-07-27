const jwt = require("jsonwebtoken");

//this function is to verify the web token
function verify(req, res, next) {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    // the below function named verify only verifies that the token is either expired or not according to to time limit provided in the authentication login
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
    // the below line indicates that once the token is verified as true the users credentials are 
    //passed to the user property of the request object using the user of the verify function 
    //above that stores the properties of registerd user.
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
}

module.exports = verify;