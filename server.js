const express = require('express'); // JS backend
const mongoose = require('mongoose'); // ORM for MongoDB
const bodyParser = require('body-parser'); // parsing request body

const mongoUri = require('./config/keys').mongoURI;
const port = process.env.PORT || 5000;
const items = require('./routes/api/items');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.log(error));

// Use routes
// => alternatively one could use app.get(...), app.post(...) instead of the dedicated express.Router
app.use('/api/items', items);

// Start the app (express server component)
app.listen(port, () => console.log(`Server started on port ${port}`));
