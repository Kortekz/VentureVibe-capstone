import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { addUser } from '../models/userDatabase.js';
import { checkUser, getUserEmail } from '../models/userDatabase.js';
import { config } from 'dotenv';

config();

// bcrypt auth
const auth = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await checkUser(email);
        bcrypt.compare(password, hashedPassword, async (err, result) => {
            if (err) throw err;
            if (result === true) {
                let currentUser = await getUserEmail(email);
                const token = jwt.sign({ currentUser: currentUser }, process.env.SECRET_KEY, { expiresIn: '1h' });

                res.cookie('token', token, { httpOnly: false, expiresIn: '1h' });
                res.send({
                    token: token,
                    msg: 'You have successfully logged in!',
                    user: currentUser
                });
                next();
            } else {
                res.send({ msg: 'The email or password is incorrect' });
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ error: 'An error occurred while authenticating user' });
    }
};

export { auth };
