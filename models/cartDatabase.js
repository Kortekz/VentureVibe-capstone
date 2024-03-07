
import {pool} from '../config/config.js'

// this is for retrieving cart products from the database
const carts = async()=>{ 
    const [result] = await pool.query(`
    SELECT * FROM cart
    `)
    return result
}

// this is for retrieving cart products from the database where the id matches
 const userCart = async(orderID)=>{
    const [result] = await pool.query(`
    SELECT * FROM cart
    WHERE orderID = ?
    `, [orderID])
    return result
}

// this is for adding products
const addCart = async(quantity, hubID, userID)=>{
    const [cartPlus] = await pool.query(`
    INSERT INTO cart (quantity, hubID, userID) VALUES (?,?,?,?)
    `,[quantity, hubID, userID])
    return userCart(cartPlus.insertId)
}

// this is for deleting products in the cart
const deleteCart = async(userID, hubID)=>{
    const [Hubs] = await pool.query (`
    DELETE FROM cart WHERE userID = ? AND hubID = ? 
    `, [userID, hubID])
    return carts()
}




export {carts, userCart, addCart, deleteCart}