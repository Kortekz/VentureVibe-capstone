import { pool } from '../config/config.js'

// LOGIC FOR USERS

// adds a new User
const addUser = async (firstName, lastName, email, password, userRole) => {
    try {
        await pool.query(`
        INSERT INTO Users (firstName, lastName, email, password, userRole)
        VALUES (?,?,?,?,?);
        `, [firstName, lastName, email, password, userRole]);
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while adding user');
    }
}

// check if password is the same from database
const checkUser = async (email) => {
    try {
        const [[{ password }]] = await pool.query(`
        SELECT password FROM Users WHERE email = ?
        `, [email]);
        return password;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while checking user');
    }
}

// this is for retrieving users from the database
const getUsers = async () => {
    try {
        const [result] = await pool.query(`
        SELECT * FROM Users
        `);
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while retrieving users');
    }
}

// this is for retrieving users from the database where the id matches
const getUser = async (id) => {
    try {
        const [result] = await pool.query(`
        SELECT * FROM Users
        WHERE id = ?
        `, [id]);
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while retrieving user by ID');
    }
}

// this is for retrieving users from the database where the email matches
const getUserEmail = async (email) => {
    try {
        const [[result]] = await pool.query(`
        SELECT * FROM Users
        WHERE email = ?
        `, [email]);
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while retrieving user by email');
    }
}

// this is for deleting users
const deleteUsers = async (userID) => {
    try {
        const [User] = await pool.query(`
        DELETE FROM Users WHERE userID = ?
        `, [userID]);
        return getUsers();
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while deleting user');
    }
}

// this is for editing users
const editUsers = async (firstName, lastName, email, password, userRole, userID) => {
    try {
        const [Users] = await pool.query(`
        UPDATE Users SET firstName=?, lastName=?,email=?,  password=?, userRole=?
        WHERE userID=?
        `, [firstName, lastName, email, password, userRole, userID]);
        return getUsers();
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while editing user');
    }
}

export { getUsers, getUser, addUser, deleteUsers, editUsers, checkUser, getUserEmail };
