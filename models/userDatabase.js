
import {pool} from '../config/config.js'


// LOGIC FOR USERS

// adds a new User
const addUser = async(firstName, lastName, email, password, userRole)=> {
    await pool.query(`
    INSERT INTO Users (firstName, lastName, email, password, userRole)
    VALUES (?,?,?,?,?);
    `, [firstName, lastName, email, password, userRole])
}

// check if password is the same from database
const checkUser = async(email)=> {
    const [[{password}]] = await pool.query(`
    SELECT password FROM Users WHERE email = ?
    `, [email])
    return password
}
// console.log (await checkUser('cornebalie@789gmail.com'));


// this is for retrieving users from the database
const getUsers = async()=>{ 
    const [result] = await pool.query(`
    SELECT * FROM Users
    `)
    return result
}

// this is for retrieving users from the database where the id matches
 const getUser = async(id)=>{
    const [result] = await pool.query(`
    SELECT * FROM Users
    WHERE id = ?
    `, [id])
    return result
}
// this is for retrieving users from the database where the id matches
const getUserEmail = async(email)=>{
    const [[result]] = await pool.query(`
    SELECT * FROM Users
    WHERE email = ?
    `, [email])
    return result
}
// console.log(await getUserEmail('cornebalie789@gmail.com'))

// this is for deleting users
const deleteUsers = async (userID) => {
    const [User] = await pool.query(`
        DELETE FROM Users WHERE userID = ?
    `, [userID]);
    return getUsers()
};


// this is for editing users
const editUsers = async(firstName,lastName,email, password,userRole, userID)=>{
    const [Users] = await pool.query (`
    UPDATE Users SET firstName=?, lastName=?,email=?,  password=?, userRole=?
    WHERE userID=? 
    `, [firstName,lastName,email, password, userRole, userID])
    return getUsers()
}
// const editUser=async(firstName,lastName,userRole,email,password,id)=>{
//     await pool.query(
//     UPDATE users SET firstName=?, lastName=?, userRole=?,email=?, password=? 
//     WHERE id=? 
//      [firstName,lastName,userRole,email,password,id])
//      return getUsers()
// }

  
// this is for adding products
// const addHub = async(name,description, imageUrl, price, category, date)=>{
//     const [Hubs] = await pool.query(`
//     INSERT INTO Users (name,age) VALUES (?,?)
//     `,[name,description, imageUrl, price, category, date])
//     return getHub(Hubs.insertId)
// }

export {getUsers, getUser, addUser, deleteUsers, editUsers, checkUser, getUserEmail}