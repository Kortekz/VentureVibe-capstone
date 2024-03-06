import { addUser } from "../models/userDatabase.js";


export default{

    // sign in 
addUser: async(req, res) => {
    const {firstName, lastName, email, password, userRole} = req.body
    await addUser(firstName, lastName, email, password, userRole)
    res.send({msg})
},

loginUser: async(req,res) => {
    res.send({msg})
}

}
