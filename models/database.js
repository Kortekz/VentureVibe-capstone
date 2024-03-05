

// getFriends
const getHubs = async()=>{ 
    const [result] = await pool.query(`
    SELECT * FROM GetAwayHub
    `)
    return result
}

// getFriends
 const getHub = async(id)=>{
    const [result] = await pool.query(`
    SELECT * FROM GetAwayHub
    WHERE id = ?
    `, [id])
    return result
}

// addFriends
const addHub = async(name,description, imageUrl, price, category, date)=>{
    const [Hubs] = await pool.query(`
    INSERT INTO GetAwayHub (name,age) VALUES (?,?)
    `,[name,description, imageUrl, price, category, date])
    return getHub(Hubs.insertId)
}



// deleteFriends
const deleteHub = async(name)=>{
    const [Hubs] = await pool.query (`
    DELETE FROM GetAwayHub WHERE name = ? 
    `, [Hubs])
}


// editFriend
const editHub = async(name,description, imageUrl, price, category, date, id)=>{
    const [Hubs] = await pool.query (`
    UPDATE mates
    SET name = ?, description = ?, imageUrl = ?, price = ?, category = ?
    WHERE (id=?)
    `, [name,description, imageUrl, price, category, date, id])
    return Hubs()
}

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