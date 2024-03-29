import {  addCart, patchCarts, getIdUsers, getUserCart, deleteID, deleteCart, deleteFromCart, getCarts, cartOrderID } from "../models/cartDatabase.js";
import jwt from 'jsonwebtoken';

export default {
    //cart table function for the user
    addToCart: async (req, res) => {
        const email = req.email;

        try {
            const userID = await getIdUsers(email);
            console.log(userID);

            const {quantity, hubID} = req.body;

            await addCart(userID, quantity, hubID);
            res.send({msg: 'Product added to cart!'});
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send({ error: 'An error occurred while adding product to cart' });
        }
    },

    getCart: async (req, res) => {
        try {
            const email = req.email;
            console.log('email'+ email);

            const userID = await getIdUsers(email);
            console.log('userID'+ userID);
            const userCart = await getUserCart(userID);
            console.log('userCart'+ userCart);
            res.send(userCart);
        } catch (error) {
            console.error("Error fetching user cart:", error);
            res.status(404).send({msg:"There are no Items in cart"});
        }
    },

    deleteCart: async (req, res) => {
        const email = req.email;
        try {
            const userID = await getIdUsers(email);
            await deleteCart(userID);
            res.send({msg:'Thank you for your purchase'});
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send({ error: 'An error occurred while deleting cart' });
        }
    },

    DeleteFromCart: async (req, res) => {
        const email = req.email;
        const hubID = parseInt(req.params.id);
        try {
            const userID = await getIdUsers(email);
            res.send(await deleteFromCart(userID, hubID));
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send({ error: 'An error occurred while deleting item from cart' });
        }
    },

    //cart table function for the Admin
    getCarts: async (req, res) => {
        try {
            const carts = await getCarts();
            res.send(carts);
        } catch (error) {
            console.error("Error fetching carts:", error);
            res.status(404).send({msg:"No carts available"});
        }
    },

    deleteCartById: async(req,res)=>{
        try {
            res.send(await deleteID(+req.params.id));
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send({ error: 'An error occurred while deleting cart by ID' });
        }
    },

    postAdmin: async (req, res) => {
        try {
            const { userID, quantity, hubID } = req.body;
            await addCart(userID, quantity, hubID);
            res.send({ msg: 'Product added to cart successfully' });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send({ error: 'An error occurred while adding product to cart' });
        }
    },

    patchCart: async(req,res)=>{
        try {
            const [cart] = await cartOrderID(+req.params.id);
            let {userID, quantity, hubID} = req.body;
            userID ? userID = userID : {userID} = cart;
            quantity ? quantity = quantity : {quantity} = cart;
            hubID ? hubID = hubID : {hubID} = cart;

            await patchCarts(userID, quantity, hubID, +req.params.id);
            res.send(await getCarts());
            console.log(hubID);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send({ error: 'An error occurred while patching cart' });
        }
    }
};
