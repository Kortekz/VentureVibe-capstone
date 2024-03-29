import { getUsers, getUser, addUser, deleteUsers, editUsers, checkUser } from '../models/userDatabase.js';
import bcrypt from 'bcrypt';

export default {
    getMany: async (req, res) => {
        try {
            res.send(await getUsers());
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send({ error: 'An error occurred while fetching users' });
        }
    },

    getID: async (req, res) => {
        try {
            res.send(await getUser(+req.params.id));
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send({ error: 'An error occurred while fetching user by ID' });
        }
    },

    getUser: async (req, res) => {
        try {
            const email = req.email;
            console.log(email);
            res.send(await getUserEmail(email));
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send({ error: 'An error occurred while fetching user by email' });
        }
    },

    deleteID: async (req, res) => {
        try {
            await deleteUsers(req.params.id);
            res.json(await getUsers());
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send({ error: 'An error occurred while deleting user by ID' });
        }
    },

    patchID: async (req, res) => {
        try {
            const [Users] = await getUser(+req.params.id);
            let { firstName, lastName, email, password, userRole } = req.body;

            // Update the fields if provided in the request body
            firstName ? firstName = firstName : { firstName } = Users;
            lastName ? lastName = lastName : { lastName } = Users;
            email ? email = email : { email } = Users;
            userRole ? userRole = userRole : { userRole } = Users;

            // Check if password is provided and hash it
            if (password) {
                bcrypt.hash(password, 10, async (err, hash) => {
                    if (err) throw err;
                    await editUsers(firstName, lastName, email, hash, userRole, +req.params.id);
                    res.send({ msg: "You have edited your account" });
                });
            } else {
                // If password is not provided, update other fields without hashing the password
                await editUsers(firstName, lastName, email, Users.password, userRole, +req.params.id);
                res.send({ msg: "You have edited your account" });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send({ error: 'An error occurred while patching user' });
        }
    },

    addUser: async (req, res) => {
        try {
            const { firstName, lastName, email, password, userRole } = req.body;
            bcrypt.hash(password, 10, async (err, hash) => {
                if (err) throw err;
                await addUser(firstName, lastName, email, hash, userRole);
                res.send({
                    msg: "Your account has been successfully created!"
                });
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send({ error: 'An error occurred while adding user' });
        }
    },

    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            await checkUser(email, password);
            // res.send(res.msg);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send({ error: 'An error occurred while logging in user' });
        }
    }
};
