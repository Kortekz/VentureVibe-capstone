
import {pool} from '../config/config.js'

// this is for retrieving cart products from the database
// const carts = async()=>{ 
//     const [result] = await pool.query(`
//     SELECT * FROM cart
//     `)
//     return result
// }

// USERS FUNCTIONS USERS FUNCTIONS USERS FUNCTIONS USERS FUNCTIONS USERS FUNCTIONS USERS FUNCTIONS USERS FUNCTIONS USERS FUNCTIONS USERS FUNCTIONS

// this is for retrieving cart products from the database where the id matches

 const userCart = async(userID)=>{
    const [result] = await pool.query(`
    SELECT * FROM cart
    WHERE userID = ?
    `, [userID])
    return result
}

// this is for adding products
const addCart = async(userID, quantity, hubID)=>{
    const [cartPlus] = await pool.query(`
    INSERT INTO cart (userID, quantity, hubID) VALUES (?,?,?)
    `,[userID, quantity, hubID])
    return userCart()
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

const getIdUsers = async(email)=>{
    const [[{userID}]] = await pool.query (`
    SELECT userID FROM Users WHERE email = ? 
    `, [email])
    return userID
}

const updateProducts = async(userID) => {
    await pool.query(`
    UPDATE GetAwayHub 
    JOIN (
        SELECT cart.hubID, SUM(cart.quantity) AS total_sold
        from cart
        WHERE cart.userID = ?
        GROUP BY cart.hubID
        ) AS soldTotal ON GetAwayHub.hubID = soldTotal.hubID
        SET GetAwayHub.quantity = GetAwayHub.quantity = soldTotal.total_sold
    )`, [userID])
}

const getUserCart = async (userID) => {
    const [cartProducts] = await pool.query(`
    SELECT cart.quantity AS sold_quantity,
    GetAwayHub.price AS price_per_item,
    (cart.quantity * GetAwayHub.price) AS total_price,
    GetAwayHub.imageUrl,
    GetAwayHub.name,
    GetAwayHub.hubID
    FROM cart
    JOIN GetAwayHub ON cart.hubID = GetAwayHub.hubID
    WHERE cart.userID = ?
    `, [userID])
    return cartProducts;
}


const deleteCartID = async (userID) => {
    await pool.query(`
    DELETE FROM cart WHERE userID = ?
    `, [userID])
}

const deleteFromCart =  async (userID, hubID) => {
    await pool.query(`
    DELETE FROM cart WHERE userID=? AND hubID = ? 
    `, [userID, hubID])
    return userCart()
}

// ADMIN FUNCTIONS ADMIN FUNCTIONS ADMIN FUNCTIONS ADMIN FUNCTIONS ADMIN FUNCTIONS ADMIN FUNCTIONS ADMIN FUNCTIONS ADMIN FUNCTIONS ADMIN FUNCTIONS 

// admin for patching
const patchCart = async(userID, quantity, hubID, orderID)=>{
    await pool.query (`
    UPDATE cart SET userID=?, quantity=?, hubID = ? 
    where orderID = ?
    `, [userID, quantity, hubID, orderID])
    return getCarts()
}

// display all carts that any users made
const getCarts = async()=>{
    const [result] = await pool.query(`
    SELECT * FROM cart`)
    if (!result || result.length === 0){
        throw error()
    }
    return result
}

const deleteID = async (orderID) => {
    await pool.query(`
    DELETE FROM cart WHERE orderID = ?
    `, [orderID])
    return userCart()
}


const cartOrderID = async (orderID)=>{
    const [cartItems] = await pool.query(`
    SELECT * FROM cart WHERE orderID = ?
    `, [orderID])
    return cartItems
}

export { addCart, deleteCart, getUserID, patchCart,getCarts, deleteID, deleteFromCart, updateProducts, deleteCartID, cartOrderID, getIdUsers, getUserCart}