const express = require("express"); // JS backend
const mongoose = require("mongoose"); // ORM for MongoDB
const path = require("path"); // built-in file path utility

require('dotenv').config(); // enable access to .env file
const mongoURL = process.env.DATABASE_URL;
const port = process.env.PORT || 5000;

const itemRoutes = require("./routes/api/items");
const userRoutes = require("./routes/api/users");

// Init the express app
const app = express();

// Bodyparser Middleware
app.use(express.json());

// Connect to MongoDB (using Promise API)
mongoose
	.connect(mongoURL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	})
	.then(() => console.log("MongoDB connected"))
	.catch((error) => console.log(`using ${mongoURL} caused ${error}`));

// Use routes (basically map /api/items/* calls to the itemRoutes)
// => alternatively one could use app.get(...), app.post(...) instead of the dedicated express.Router
app.use("/api/items", itemRoutes);
app.use("/api/users", userRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
	// set static folder
	app.use(express.static("client/build"));
	// handle all requests not being already taken care of by the itemRoutes (api/items/ calls).
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

// Start the app (express server component)
app.listen(port, () => console.log(`Server started on port ${port}`));
