import { getUserID, deleteCart, userCart } from '../models/cartDatabase.js';

export default {

  addToCart: async (req, res) => {
    const email = req.email

    try {
      const userID = await getUserID(email)
      if (!userID) {
        // Handle the case where the user is not found
        return res.status(404).send({ error: 'User not found' })
      }

      const { quantity, hubID } = req.body
      const userCart = await addCart(quantity, hubID, userID)

      // Send the updated cart back to the user
      return res.status(201).send({ message: 'Product added to cart', cart: userCart })
    } catch (error) {
      console.error('Error adding product to cart:', error)
      return res.status(500).send({ error: 'Internal Server Error' })
    }
  },

  getCart: async (req, res) => {
    const email = req.email

    try {
      const userID = await getUserID(email)
      if (!userID) {
        // Display when the user is not found
        return res.status(404).json({ error: 'User not found' })
      }

      // Retrieve cart items for the user
      const itemsInCart = await userCart(userID)

      // Send the cart items back to the user
      return res.send(itemsInCart)
    } catch (error) {
      console.error('Error retrieving cart items:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  deleteFromCart: async (req, res) => {
    const email = req.email

    try {
      const userID = await getUserID(email)
      if (!userID) {
        // Handle the case where the user is not found
        return res.status(404).send({ error: 'User not found' })
      }

      // Delete items from the user's cart
      await deleteCart(userID)

      // Retrieve the updated cart after deletion
      const updatedCart = await userCart(userID)

      // Send the updated cart back to the user
      return res.send( updatedCart )
    } catch (error) {
      console.error('Error deleting items from cart:', error)
      return res.status(500).send({ error: 'Internal Server Error' })
    }
  },
};