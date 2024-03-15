import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()

const auth = (req, res, next) => {
    // Extract the cookie from the request headers
    const { cookie } = req.headers;
    // Check if the cookie exists and extract the token
    const tokenInHeader = cookie && cookie.split('=')[1];
    // If the token is not present, send a 401 Unauthorized response
    if (!tokenInHeader) {
        return res.sendStatus(401);
    }
    // Verify the token using the secret key
    jwt.verify(tokenInHeader, process.env.SECRET_KEY, (err, user) => {
        // If there's an error or the token is invalid, send a 403 Forbidden response
        if (err || !user) {
            return res.sendStatus(403);
        }
        // Store the user information in the request object for further processing
        req.user = user;
        req.email = user.email;
        // Call the next middleware in the chain
        next();
    });
}

export { auth };
