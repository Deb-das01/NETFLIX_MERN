const router= require("express").Router();
const User= require("../models/User");
// imported for encryption and decryption of the password
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken"); // Make sure to import jwt module

//REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      
      // there are different types of encryption process and here we take the AES type to encrypt our password
      // it also uses a SECRET_KEY defined uder the .env file
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString()
    });
    try {
        // await is used because if it takes time to save our data to the database 
        // then the other process will run only after its completion. 
        // Otherwise we may get error moving forward if the data is not found in our database.
      const user = await newUser.save();
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  //LOGIN
router.post("/login", async (req, res) => {
  try {
    // Below code checks wether the requested user is present in the database or not 
    //if not it sends a error message
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json("Wrong password or username!");
    }

    //Below line is used to decrypt the hashed password so that the password enterd by the use can be compared
    //to the password in the database
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      return res.status(401).json("Wrong password or username!");
    }

     //it is the use of jsonwebtoken here a token is being created so that it can be used to login
     // this web token is encrypted using a secret key mentioned in the .env file
     //it expires in 5days and then the user needs to relogin again 
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      // {expiresIn: "never"}
      { expiresIn: "365d" }
    );

    // it is used for detaching the password from the document which will be later used as response
    //it is done to hide the password
    const { password, ...info } = user._doc;

    // The below line of code adds the webtoken to the response json file
    return res.status(200).json({ ...info, accessToken });
  } catch (err) {
    return res.status(500).json(err);
  }
});
  module.exports = router;