const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs"); // bcrypt is a password-hashing function based on the Blowfish cipher
const jwt = require("jsonwebtoken"); // an implementation of JSON Web Tokens (also see https://jwt.io/)
require("dotenv").config; // enable access to .env file

// Load the User Model
const User = require("../../models/user");

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
		// => a salt is random data that is used as an additional input to a one-way function that hashes data, a password or passphrase. Both the hash value and the salt is stored.
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(password, salt, (err, hash) => {
				if (err) {
					throw err;
				}
				// use hashed password instead of plain text
				newUser.password = hash;
				// finally save user with hashed password in MongoDB
				newUser.save().then((user) => {
					// sign resp. transform the given payload into a JWT string (can be checked on https://jwt.io/)
					jwt.sign(
						{
							id: user._id,
						},
						process.env.JWT_SECRET,
						{ expiresIn: 3600 },
						(err, token) => {
							if (err) {
								throw err;
							}
							res.status(200).json({
								token,
								user: {
									id: user._id,
									name,
									email,
								},
							});
						}
					);
				});
			});
		});
	});
});

// old faschioned export (new approach via "export default router" only workds in newer browsers)
module.exports = router;
