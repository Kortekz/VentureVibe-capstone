import { pool } from '../config/config.js'

// this is for retrieving products from the database
const getHubs = async () => {
    try {
        const [result] = await pool.query(`
        SELECT * FROM GetAwayHub
        `);
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while retrieving hubs');
    }
}

// this is for retrieving products from the database where the id matches
const getHub = async (hubID) => {
    try {
        const [result] = await pool.query(`
        SELECT * FROM GetAwayHub
        WHERE hubID = ?
        `, [hubID]);
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while retrieving hub by ID');
    }
}

// this is for adding products
const addHub = async (name, description, imageUrl, price, category, date) => {
    try {
        const [Hubs] = await pool.query(`
        INSERT INTO GetAwayHub (name, description, imageUrl, price, category, date) VALUES (?,?,?,?,?,?)
        `, [name, description, imageUrl, price, category, date]);
        return getHub(Hubs.insertId);
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while adding hub');
    }
}

// this is for deleting products
const deleteHub = async (hubID) => {
    try {
        const [Hubs] = await pool.query(`
        DELETE FROM GetAwayHub WHERE hubID = ? 
        `, [hubID]);
        return getHubs();
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while deleting hub');
    }
}

// this is for editing products
const editHub = async (name, description, imageUrl, price, category, date, hubID) => {
    try {
        const [Hubs] = await pool.query(`
        UPDATE GetAwayHub
        SET name = ?, description = ?, imageUrl = ?, price = ?, category = ?, date = ?
        WHERE hubID = ?
        `, [name, description, imageUrl, price, category, date, hubID]);
        return getHubs();
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while editing hub');
    }
}

// LOGIC FOR USERS

// adds a new User
const newUser = async (email, password) => {
    try {
        await pool.query(`
        INSERT INTO users (email, password)
        VALUES (?,?);
        `, [email, password]);
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while adding new user');
    }
}

// check if password is the same from database
const checkUser = async (email) => {
    try {
        const [[{ password }]] = await pool.query(`
        SELECT password FROM users WHERE email = ?
        `, [email]);
        return password;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while checking user');
    }
}

export { getHubs, getHub, addHub, deleteHub, editHub, newUser, checkUser };
