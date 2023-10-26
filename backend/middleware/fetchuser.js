// This middleware will give the id of the user by taking auth Token in req.header.

var jwt = require('jsonwebtoken');
const JWT_SECRET = "Harryisagood$boy"; // This is signature(which is the last element of jwt)


const fetchuser = async (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    // In request's header we have put a key 'auth-token'. So, token with contain the AuthToken of the user
    const token = req.header('auth-token');

    // if value of 'auth-token' is empty then it will give this error
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    
    try {
        
        // jwt.verify helps in verifying the signature(JWT_SECRET) with the AuthToken
        // it is correct then it will return the data contained by the AuthToken(in the middle part)
        const data = jwt.verify(token, JWT_SECRET);
        
        req.user = data.user
        
        // next() will run the next part after fetchuser(middleware) in auth.js
        next();
        
    } catch (error) {

        // if value of 'auth-token' is invalid then it will give this error
        res.status(401).send({ error: "Please authenticate using a valid token2" });
    }

}

module.exports = fetchuser;