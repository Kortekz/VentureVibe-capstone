
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { addUser } from '../models/userDatabase.js'
import { checkUser, getUserEmail } from '../models/userDatabase.js'
import {config} from 'dotenv'
config()

// hash password
// app.post('/users',(req,res)=>{
//     const {email, password} = req.body
//     bcrypt.hash(password, 10, async(err, hash)=> {
//         if(err) throw err
//         await newUser(email, hash)
//         res.send({
//             msg: "You have created an account"
//         })
//     })
// })

// bcrypt auth
const auth = async(req,res,next) => {
    const {email, password} = req.body
    const hashedPassword = await checkUser(email)
    bcrypt.compare(password, hashedPassword, async (err,result)=>{
        if(err) throw err
        if(result === true){

            let currentUser = await getUserEmail(email)
            console.log(currentUser)

            // const {email} = req.body
            const token = jwt.sign({email:email}, process.env.SECRET_KEY,{expiresIn: '1h'})

            res.cookie('token', token, { httpOnly: false, expiresIn:'1h'})

            res.send({
                token: token,
                msg: 'You have successfully logged in !',
                user: currentUser
            })
            next()

        }else{
            console.log('somwthing');
            res.send({msg: 'The email or password is incorrect'}) 
        }
    })
}

export {auth}