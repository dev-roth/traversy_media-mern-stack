const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs"); // bcrypt is a password-hashing function based on the Blowfish cipher
const jwt = require("jsonwebtoken"); // an implementation of JSON Web Tokens (also see https://jwt.io/)
// Import the middleware for protected access
const auth = require('../../middleware/auth');
require("dotenv").config; // enable access to .env file

// Load the User Model
const User = require("../../models/user");

// @route POST api/auth
// @desc Authenticate user
// @access Public
router.post("/", (req, res) => {
	const { email, password } = req.body;

	// Validate user input
	if (!email || !password) {
		return res.status(400).json({ msg: "Please enter all mandatory fields!" });
	}

	// Check for already registered users
	User.findOne({ email }).then((user) => {
		if (!user) {
			return res.status(400).json({ msg: "User does not exist" });
		}

		// Validate password (compare passed plain text password with stored hash value)
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (!isMatch) {
				res.status(401).json({ msg: "Invalid credentials!" });
			}
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
							name: user.name,
							email,
						},
					});
				}
			);
		});
	});
});

// @route GET api/auth/user
// @desc Get the user data
// @access Private
router.get("/user", auth, (req, res) => {
	User.findById(req.user.id) // user id is fetched from the (request) token
	.select('-password') // select user without her/his password
	.then(user => res.json(user));
});

// old faschioned export (new approach via "export default router" only workds in newer browsers)
module.exports = router;
