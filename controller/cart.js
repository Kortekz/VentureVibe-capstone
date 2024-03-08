import { getUserID, addCart } from '../models/cartDatabase.js';

export default {

    
  addToCart: async (req, res) => {
    try {
      const email = req.email;

      // Get user ID based on the email
      const userID = await getUserID(email);

      if (!userID) {
        // this Handles the case where the user is not found
        return res.status(404).json({ error: 'User not found' });
      }

      const { quantity, hubID } = req.body;

      // this adds the product to the users cart
      const userCart = await addCart(quantity, hubID, userID);

      // this sends the updated cart back to the user
      return res.status(201).json({ message: 'Product added to cart', cart: userCart });
    } catch (error) {
      console.error('Error adding product to cart:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
