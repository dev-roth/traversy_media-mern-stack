const express = require("express"); // JS backend
const mongoose = require("mongoose"); // ORM for MongoDB
const bodyParser = require("body-parser"); // parsing request body

const mongoUri = require("./config/keys").mongoURI; // contains both URL and Credentials
const port = process.env.PORT || 5000;
const itemRoutes = require("./routes/api/items");

// Init the express app
const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// Connect to MongoDB (using Promise API)
mongoose
	.connect(mongoUri)
	.then(() => console.log("MongoDB connected"))
	.catch((error) => console.log(error));

// Use routes (basically map /api/items/* calls to the itemRoutes)
// => alternatively one could use app.get(...), app.post(...) instead of the dedicated express.Router
app.use("/api/items", itemRoutes);

// Start the app (express server component)
app.listen(port, () => console.log(`Server started on port ${port}`));
