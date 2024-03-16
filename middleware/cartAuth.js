import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()

const authenticate = (req,res,next) => {
    let {cookie} = req.headers
    let tokenInHeader = cookie && cookie.split('=')[1]
    if(tokenInHeader===null) res.sendStatus(401)
    jwt.verify(tokenInHeader, process.env.SECRET_KEY, (err, user)=>{
        console.log(user)
        if(err)return res.sendStatus(403)
        req.user = user
        req.emailAdd = user.emailAdd;
    next()
    })
}

export { authenticate };
