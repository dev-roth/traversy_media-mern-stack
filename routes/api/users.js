const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

// Load the Item Model
const User = require("../../models/user");

// Routes //
// => root route: /api/users (see server.js)

// @route POST api/users
// @desc Register new user
// @access Public
router.post("/", (req, res) => {
	const { name, email, password } = req.body;

	// Validate user input
	if (!name || !email || !password) {
		return res.status(400).json({ msg: "Please enter all mandatory fields!" });
	}

	// Check for already registered users
	User.findOne({ email }).then((user) => {
		if (user) {
			return res.status(400).json({ msg: "User already registered!" });
		}

		const newUser = new User({
			name,
			email,
			password,
		});

		// Create salt & hash
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) {
					throw err;
				}
				// use hashed password instead of plain text
				newUser.password = hash;
				newUser.save().then((user) => {
					res.status(200).json({
						user: {
                            id: user._id,
                            name,
                            email
                        },
					});
				});
			});
		});
	});
});

// old faschioned export (new approach via "export default router" only workds in newer browsers)
module.exports = router;
