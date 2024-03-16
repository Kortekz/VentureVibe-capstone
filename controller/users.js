
// import { addUser } from "../models/userDatabase.js";
import {getUsers, getUser, addUser, deleteUsers, editUsers, checkUser} from '../models/userDatabase.js'
import bcrypt from 'bcrypt'

export default {

    getMany: async(req,res)=>{
        res.send(await getUsers())
        },

    // postMany: async (req,res)=>{
    //     const {firstName, lastName, email, password, userRole} = req.body
    //     await addUser(firstName, lastName, email, password, userRole)
    //     res.send(await getUsers())
    //     },

    getID: async(req,res)=>{
        res.send(await getUser(+req.params.id))
        },

    deleteID: async (req,res)=>{
        await deleteUsers(req.params.id)
        res.json(await getUsers())
        },
        
    patchID: async (req,res)=>{
        const [Users] = await getUsers(+req.params.id)
        let {firstName, lastName, email, password} = req.body
        firstName ? firstName = firstName: {firstName} = Users
        lastName ? lastName = lastName: {lastName} = Users
        email ? email = email: {email} = Users
        password ? password = password: {password} = Users
        userRole ? userRole = userRole: {userRole} = Users
        await editUsers(firstName, lastName, email, password,userRole,+req.params.id)
        res.json(await getUsers())
        },


// authenticate 

// loginUser: async (req, res) => {
//     const {email, password} = req.body;
//     await checkUser(email, password)
//     res.send(res.msg)
// },

// sign in 
addUser: async(req, res) => {
    const {firstName, lastName, email, password, userRole} = req.body
    bcrypt.hash(password,10,async (err,hash)=>{
        if(err) throw err
        await addUser(firstName, lastName, email, hash, userRole)
        res.send({
            msg: "Your account has been successfully created !"
        })
     })
},

loginUser: async(req,res) => {
    const {email, password} = req.body
    await checkUser(email, password)
    // res.send(res.msg)
}
  
}






