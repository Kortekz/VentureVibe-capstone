

import {getUsers, getUser, addUser, deleteUsers, editUsers} from '../models/userDatabase.js'


export default {

    getMany: async(req,res)=>{
        res.send(await getUsers())
        },

    postMany: async (req,res)=>{
        const {firstName, lastName, email, password, userRole} = req.body
        await addUser(firstName, lastName, email, password, userRole)
        res.send(await getUsers())
        },

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
        await editUsers(firstName, lastName, email, password,+req.params.id)
        res.json(await getUsers())
        }

}

// make user controller, this is for products(HUBS)