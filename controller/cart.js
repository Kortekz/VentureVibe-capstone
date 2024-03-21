import { updateProducts, addCart, patchCart, getIdUsers, getUserCart, deleteID, deleteCart, deleteFromCart, getCarts, cartOrderID } from "../models/cartDatabase.js";
import jwt from 'jsonwebtoken';



export default {
    //cart table function for the user
    addToCart: async (req, res) => {
    const email = req.email

    try{
        const userID = await getIdUsers(email)
        console.log(userID)

        const {quantity, hubID} = req.body

        await addCart(userID, quantity, hubID)
        res.send({msg: 'Product added to cart!'})
    }catch{
        console.error('Error:', error)
        res.status(500).send({ error: 'An error occured while adding product'})
    }
    },

    getCart: async (req, res) => {
        try {
            const email = req.email;
            const userID = await getIdUsers(email);
            const userCart = await getUserCart(userID);
            res.send(userCart);
        } catch (error) {
            console.error("Error fetching user cart:", error);
            res.status(404).send({msg:"There are no Items in cart"});
        }
    },
    deleteCart: async (req, res) => {
        const email = req.email;
        const userID = await getIdUsers(email)
        updateProducts(userID)
        await deleteCart(userID);
        res.send({msg:'Thank you for your purchase'})
    },
    DeleteFromCart: async (req, res) => {
        const email = req.email
        const hubID = parseInt(+req.params.id)
        const userID = await getIdUsers(email)
        res.send(await  deleteFromCart(userID,hubID))
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
        res.send(await deleteID(+req.params.id));
    },

    postAdmin: async (req, res) => {
        try{
            const { userID, hubID, quantity } = req.body;
            await addCart(userID, hubID, quantity);
            res.send({ msg: 'Product added to cart successfully' });
        }catch (error) {
            console.error('Error:', error);
            res.status(500).send({ error: 'An error occurred while adding product to cart' });
        }
    },
    patchCart: async(req,res)=>{
      const cart = await cartOrderID(+req.params.id);
      // Check if cart is defined and has at least one item
      if (cart && cart.length > 0) {
          const {userID: cartUserID, quantity: cartQuantity, hubID: cartHubID} = cart[0];
          let {userID, quantity, hubID} = req.body;
          userID = userID || cartUserID;
          quantity = quantity || cartQuantity;
          hubID = hubID || cartHubID;
          await patchCart(userID, quantity, hubID, +req.params.id);
          res.send(await getCarts());
      } else {
          // this Handles the case where cart is undefined or empty
          res.status(404).send({ error: 'Cart not found' });
      }
  }
  
}