

import jwt from 'jsonwebtoken'
import {config} from 'dotenv'
config()

const authenticate = (req,res,next) => {
    let {cookie} = req.headers
    let tokenInHeader = cookie && cookie.split('=')[1]
    if (tokenInHeader === undefined) res.sendStatus(401)
    console.log(tokenInHeader)
    jwt.verify(tokenInHeader, process.env.SECRET_KEY, (err, user)=>{
        if(err)return res.sendStatus(403)
        req.user = user
        req.email = user.email
        next()
    })
}

export {authenticate}