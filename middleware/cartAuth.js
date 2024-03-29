import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

const authenticate = (req, res, next) => {
    try {
        console.log(JSON.stringify(req.body));
        console.log('query params' + JSON.stringify(req.query));
        let tokenInHeader = req.query.token;
        
        if (!tokenInHeader) {
            return res.sendStatus(401);
        }
        
        jwt.verify(tokenInHeader, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                console.error('Error verifying token:', err);
                return res.sendStatus(403);
            }

            req.user = user;
            req.email = user.currentUser.email;
            next();
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ error: 'An error occurred while authenticating user' });
    }
};

export { authenticate };
