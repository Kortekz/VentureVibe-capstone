import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()

const authenticate = (req,res,next) => {
    let {cookie} = req.headers
    // console.log(req.headers)
    // console.log(cookie.split(';')[0].split('=')[1])
    let tokenInHeader = cookie && cookie.split(';')[0].split('=')[1]
    if(tokenInHeader===null) res.sendStatus(401)
    console.log(tokenInHeader);
    jwt.verify(tokenInHeader, process.env.SECRET_KEY, (err, user)=>{
        console.log('Before the err 403');
        if(err)return res.sendStatus(403)
        console.log('After the err 403');

        req.user = user;
        req.email = user.currentUser.email; 
        // this accesses email from currentUser object
        // console.log(user.currentUser.email);
    next()
    })
}

export { authenticate };
