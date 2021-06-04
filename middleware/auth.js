const jwt = require("jsonwebtoken"); // an implementation of JSON Web Tokens (also see https://jwt.io/)
require("dotenv").config; // enable access to .env file

/** 
 * auth middleware can be put within routes to protect access to them. The system will carry on with the acutal request handling (next)
 * if the (access) token is passed via request header (x-auth-token) and if the token is valid.
*/
function auth(req, res, next) {
    const token = req.header('x-auth-token');
    // Check for token
    if (!token) {
        return res.status(401).json({ msg: 'No token. Authorization denied' });
    }

    try {
        // Verfiy token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Get the user payload (_id) from the token
        req.user = decoded;
        // Call the next middleware
        next();
    
    } catch {
        res.status(400).json({ msg: 'Token is not valid' });    
    }
}

module.exports = auth;