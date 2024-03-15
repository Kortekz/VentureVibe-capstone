import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { addUser } from '../models/userDatabase.js'
import { checkUser, getUserEmail } from '../models/userDatabase.js'
import { config } from 'dotenv'

config()

const authenticateUser = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const hashedPassword = await checkUser(email)
        if (!hashedPassword) {
            return res.status(401).send({ msg: 'Authentication failed' })
        }
        
        const passwordMatch = await bcrypt.compare(password, hashedPassword)
        if (!passwordMatch) {
            return res.status(401).send({ msg: 'Authentication failed' })
        }

        const currentUser = await getUserEmail(email)
        const token = jwt.sign({ email: email }, process.env.SECRET_KEY, { expiresIn: '1h' })

        res.cookie('token', token, { httpOnly: true, expiresIn: '1h' })
        res.status(200).send({
            token: token,
            msg: 'You have successfully logged in!',
            user: currentUser
        })
        next()
    } catch (error) {
        console.error('Authentication error:', error)
        res.status(500).send({ msg: 'Internal server error' })
    }
}

export { authenticateUser }
