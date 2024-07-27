const express = require("express"); // Import the Express framework
const app = express(); // Create an instance of an Express application
const mongoose = require("mongoose"); // Import Mongoose for MongoDB connection
const dotenv = require("dotenv"); // Import dotenv to manage environment variables
const cors = require("cors"); // Import CORS middleware
const authRoute = require("./routes/auth"); // Import authentication routes
const userRoute = require("./routes/users"); // Import user routes
const movieRoute = require("./routes/movies"); // Import movie routes
const listRoute = require("./routes/lists"); // Import list routes

dotenv.config(); // Load environment variables from a .env file
mongoose.connect(process.env.MONGO_URL, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true
}).then(() => {
    console.log("DB connection successfully");
}).catch((err) => {
    console.log(err);
});

// Use CORS middleware to enable Cross-Origin Resource Sharing
// CORS allows your backend server to respond to requests from different origins (e.g., different domains, ports, or protocols)
// Here, it is configured to allow requests from 'http://localhost:3000' (your frontend URL)
// It also specifies allowed HTTP methods and enables cookies to be sent with requests
app.use(cors({
    origin: [
        'https://netflix-client-orpin.vercel.app',
        'https://netflix-admin-eight.vercel.app'
    ], // Adjust this to your frontend's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Allow cookies to be sent with the requests
}));

app.use(express.json()); // Middleware to parse incoming JSON requests

// Define routes for different functionalities
app.use("/api/auth", authRoute); // Routes for authentication
app.use("/api/users", userRoute); // Routes for user-related operations
app.use("/api/movies", movieRoute); // Routes for movie-related operations
app.use("/api/lists", listRoute); // Routes for list-related operations

// Start the server on port 8800 and log a message when it's running
const port= process.env.PORT||8800;
app.listen(port, () => {
    console.log("Backend server is running!");
});
