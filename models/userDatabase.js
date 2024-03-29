import { pool } from '../config/config.js';

// adds a new User
const addUser = async (firstName, lastName, email, password, userRole) => {
    try {
        await pool.query(`
        INSERT INTO Users (firstName, lastName, email, password, userRole)
        VALUES (?,?,?,?,?);
        `, [firstName, lastName, email, password, userRole]);
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
};

// check if password is the same from database
const checkUser = async (email) => {
    try {
        const [[{ password }]] = await pool.query(`
        SELECT password FROM Users WHERE email = ?
        `, [email]);
        return password;
    } catch (error) {
        console.error('Error checking user:', error);
        throw error;
    }
};

// this is for retrieving users from the database
const getUsers = async () => {
    try {
        const [result] = await pool.query(`
        SELECT * FROM Users
        `);
        return result;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

// this is for retrieving users from the database where the id matches
const getUser = async (id) => {
    try {
        const [result] = await pool.query(`
        SELECT * FROM Users
        WHERE userID = ?
        `, [id]);
        return result;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
};

// this is for retrieving users from the database where the email matches
const getUserEmail = async (email) => {
    try {
        const [[result]] = await pool.query(`
        SELECT * FROM Users
        WHERE email = ?
        `, [email]);
        return result;
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw error;
    }
};

// this is for deleting users
const deleteUsers = async (userID) => {
    try {
        await pool.query(`
            DELETE FROM Users WHERE userID = ?
        `, [userID]);
        return getUsers();
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

// this is for editing users
const editUsers = async (firstName, lastName, email, password, userRole, userID) => {
    try {
        await pool.query(`
        UPDATE Users SET firstName=?, lastName=?, email=?,  password=?, userRole=?
        WHERE userID=?
        `, [firstName, lastName, email, password, userRole, userID]);
        return getUsers();
    } catch (error) {
        console.error('Error editing user:', error);
        throw error;
    }
};

export { getUsers, getUser, addUser, deleteUsers, editUsers, checkUser, getUserEmail };
