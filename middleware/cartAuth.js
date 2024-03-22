import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()

const authenticate = (req, res, next) => {
    try {
        let { cookie } = req.headers;
        let tokenInHeader = cookie && cookie.split(';')[0].split('=')[1];

        if (!tokenInHeader) return res.sendStatus(401);

        jwt.verify(tokenInHeader, process.env.SECRET_KEY, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            req.email = user.currentUser.email; // Adjusted to access email from currentUser object
            console.log(user.currentUser.email);
            next();
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ error: 'An error occurred during authentication' });
    }
};

export { authenticate };
