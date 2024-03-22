import { pool } from '../config/config.js'

// USERS FUNCTIONS USERS FUNCTIONS USERS FUNCTIONS USERS FUNCTIONS USERS FUNCTIONS USERS FUNCTIONS USERS FUNCTIONS USERS FUNCTIONS USERS FUNCTIONS

// this is for retrieving cart products from the database where the id matches
const userCart = async (userID) => {
    try {
        const [result] = await pool.query(`
        SELECT * FROM cart
        WHERE userID = ?
        `, [userID]);
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while retrieving user cart');
    }
}

// this is for adding products
const addCart = async (userID, quantity, hubID) => {
    try {
        const [cartPlus] = await pool.query(`
        INSERT INTO cart (userID, quantity, hubID) VALUES (?,?,?)
        `, [userID, quantity, hubID]);
        return userCart(userID);
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while adding product to cart');
    }
}

// this is for deleting products in the cart
const deleteCart = async (userID) => {
    try {
        await pool.query(`
        DELETE FROM cart WHERE userID = ? 
        `, [userID]);
        return userCart(userID);
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while deleting product from cart');
    }
}

// this is for getting users from the database based on their email ID
const getIdUsers = async (email) => {
    try {
        const [[{ userID }]] = await pool.query(`
        SELECT userID FROM Users WHERE email = ? 
        `, [email]);
        return userID;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while getting user ID');
    }
}

const getUserCart = async (userID) => {
    try {
        const [cartProducts] = await pool.query(`
        SELECT cart.quantity AS soldQuantity,
        GetAwayHub.price AS pricePerItem,
        (cart.quantity * GetAwayHub.price) AS totalPrice,
        GetAwayHub.imageUrl,
        GetAwayHub.name,
        GetAwayHub.hubID
        FROM cart
        JOIN GetAwayHub ON cart.hubID = GetAwayHub.hubID
        WHERE cart.userID = ?
        `, [userID]);
        return cartProducts;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while getting user cart products');
    }
}

const deleteFromCart = async (userID, hubID) => {
    try {
        await pool.query(`
        DELETE FROM cart WHERE userID=? AND hubID = ? 
        `, [userID, hubID]);
        return userCart(userID);
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while deleting product from cart');
    }
}

// ADMIN FUNCTIONS ADMIN FUNCTIONS ADMIN FUNCTIONS ADMIN FUNCTIONS ADMIN FUNCTIONS ADMIN FUNCTIONS ADMIN FUNCTIONS ADMIN FUNCTIONS ADMIN FUNCTIONS 

// admin for patching
const patchCarts = async (userID, quantity, hubID, orderID) => {
    try {
        await pool.query(`
        UPDATE cart SET userID=?, quantity=?, hubID = ? 
        where orderID = ?
        `, [userID, quantity, hubID, orderID]);
        return getCarts();
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while patching cart');
    }
}

// display all carts that any users made
const getCarts = async () => {
    try {
        const [result] = await pool.query(`
        SELECT * FROM cart`);
        if (!result || result.length === 0) {
            throw new Error('No carts available');
        }
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while getting carts');
    }
}

const deleteID = async (orderID) => {
    try {
        await pool.query(`
        DELETE FROM cart WHERE orderID = ?
        `, [orderID]);
        return userCart();
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while deleting cart by ID');
    }
}

const cartOrderID = async (orderID) => {
    try {
        const [cartItems] = await pool.query(`
        SELECT * FROM cart WHERE orderID = ?
        `, [orderID]);
        return cartItems;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while getting cart by order ID');
    }
}

export { addCart, deleteCart, getIdUsers, patchCarts, getCarts, deleteID, deleteFromCart, cartOrderID, getUserCart }
