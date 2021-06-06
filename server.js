const express = require("express"); // JS backend (Node Web-Framework)
const mongoose = require("mongoose"); // ORM for MongoDB
const path = require("path"); // built-in file path utility

require("dotenv").config();
// enable access to .env file
const mongoURL = process.env.DATABASE_URL;
const port = process.env.PORT || 5000;

// Init the express app
const app = express();

// Bodyparser Middleware
app.use(express.json());

// Connect to MongoDB (using Promise API)
mongoose
	.connect(mongoURL, {
		// recommended options to use, but would work without them too
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => console.log("MongoDB connected"))
	.catch((error) => console.log(`using ${mongoURL} caused ${error}`));

// Use separate routes resp. map the API paths to the route files.
// Defining the routes directly in the server.js via app.get(), .post(),... would be possible too, but ugly.
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

// Serve static assets in production (code needed for "real" deployments)
if (process.env.NODE_ENV === "production") {
	// set static folder
	app.use(express.static("client/build"));
	// handle all requests not being already taken care of by the other routes by serving the "landing page"
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

// Actual start of the app (express server component)
app.listen(port, () => console.log(`Server started on port ${port}`));
