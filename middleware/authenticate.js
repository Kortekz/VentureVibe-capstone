
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { addUser } from '../models/userDatabase.js'
import { checkUser } from '../models/userDatabase.js'
import {config} from 'dotenv'
config()

// hash password
app.post('/users',(req,res)=>{
    const {username, password} = req.body
    bcrypt.hash(password, 10, async(err, hash)=> {
        if(err) throw err
        await newUser(username, hash)
        res.send({
            msg: "You have created an account"
        })
    })
})

// bcrypt auth
const auth = async(req,res,next) => {
    const {email, password} = req.body
    const hashedPassword = await checkUser(email)
    bcrypt.compare(password, hashedPassword, (err,result)=>{
        if(err) throw err
        if(result === true){
            const {email} = req.body
            const token = jwt.sign({email:email}, process.env.SECRET_KEY,{expiresIn: '1h'})
       
            // if set to true the front end user cannot access the cookie
            res.send({
                token: token,
                msg: 'You have logged in! YAY!'
            })
            next()
        }else{
            res.send({msg: 'The username or password is incorrect'})
        }
    })
}



export {auth}