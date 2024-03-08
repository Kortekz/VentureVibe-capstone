
import {pool} from '../config/config.js'

// this is for retrieving cart products from the database
// const carts = async()=>{ 
//     const [result] = await pool.query(`
//     SELECT * FROM cart
//     `)
//     return result
// }

// this is for retrieving cart products from the database where the id matches
 const userCart = async(userID)=>{
    const [result] = await pool.query(`
    SELECT * FROM cart
    WHERE userID = ?
    `, [userID])
    return result
}

// this is for adding products
const addCart = async(quantity, hubID, userID)=>{
    const [cartPlus] = await pool.query(`
    INSERT INTO cart (quantity, hubID, userID) VALUES (?,?,?)
    `,[quantity, hubID, userID])
    return userCart(cartPlus.insertId)
}

// this is for deleting products in the cart
const deleteCart = async(userID)=>{
    const [Hubs] = await pool.query (`
    DELETE FROM cart WHERE userID = ? 
    `, [userID])
    return userCart()
}  

// this is for getting users from the database based on their email ID
const getUserID = async(email)=>{
    const [[{userID}]] = await pool.query (`
    SELECT * FROM Users WHERE email = ? 
    `, [email])
    return userID
}


export { userCart, addCart, deleteCart, getUserID}