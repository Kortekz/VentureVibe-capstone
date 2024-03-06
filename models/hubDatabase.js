
import {pool} from '../config/config.js'

// this is for retrieving products from the database
const getHubs = async()=>{ 
    const [result] = await pool.query(`
    SELECT * FROM GetAwayHub
    `)
    return result
}

// this is for retrieving products from the database where the id matches
 const getHub = async(hubID)=>{
    const [result] = await pool.query(`
    SELECT * FROM GetAwayHub
    WHERE hubID = ?
    `, [hubID])
    return result
}

// this is for adding products
const addHub = async(name,description, imageUrl, price, category, date)=>{
    const [Hubs] = await pool.query(`
    INSERT INTO GetAwayHub (name, description, imageUrl, price, category, date) VALUES (?,?,?,?,?,?)
    `,[name,description, imageUrl, price, category, date])
    return getHub(Hubs.insertId)
}

// this is for deleting products
const deleteHub = async(hubID)=>{
    const [Hubs] = await pool.query (`
    DELETE FROM GetAwayHub WHERE hubID = ? 
    `, [hubID])
    return getHubs()
}


// this is for editing products
const editHub = async(name,description, imageUrl, price, category, date, hubID)=>{
    const [Hubs] = await pool.query (`
    UPDATE GetAwayHub
    SET name = ?, description = ?, imageUrl = ?, price = ?, category = ?, date = ?
    WHERE hubID = ?
    `, [name,description, imageUrl, price, category, date, hubID])
    return getHubs()
}

// LOGIC FOR USERS

// adds a new User
const newUser = async(email, password)=> {
    await pool.query(`
    INSERT INTO users (email, password)
    VALUES (?,?);
    `, [email, password])
}

// check if password is the same from database
const checkUser = async(email)=> {
    const [[{password}]] = await pool.query(`
    SELECT password FROM users WHERE email = ?
    `, [email])
    return password
}



export {getHubs, getHub, addHub, deleteHub, editHub, newUser, checkUser}