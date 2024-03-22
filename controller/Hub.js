import { getHubs, getHub, addHub, deleteHub, editHub } from '../models/hubDatabase.js'

export default {

    getMany: async (req, res) => {
        try {
            const hubs = await getHubs();
            res.send(hubs);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send({ error: 'An error occurred while fetching hubs' });
        }
    },

    postMany: async (req, res) => {
        try {
            const { name, description, imageUrl, price, category, date } = req.body;
            await addHub(name, description, imageUrl, price, category, date);
            const updatedHubs = await getHubs();
            res.send(updatedHubs);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send({ error: 'An error occurred while adding hub' });
        }
    },

    getID: async (req, res) => {
        try {
            const hub = await getHub(+req.params.id);
            res.send(hub);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send({ error: 'An error occurred while fetching hub by ID' });
        }
    },

    deleteID: async (req, res) => {
        try {
            await deleteHub(req.params.id);
            const updatedHubs = await getHubs();
            res.send(updatedHubs);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send({ error: 'An error occurred while deleting hub by ID' });
        }
    },

    patchID: async (req, res) => {
        try {
            const [hub] = await getHubs(+req.params.id);
            let { name, description, imageUrl, price, category, date } = req.body;
            name = name ? name : hub.name;
            description = description ? description : hub.description;
            imageUrl = imageUrl ? imageUrl : hub.imageUrl;
            price = price ? price : hub.price;
            category = category ? category : hub.category;
            date = date ? date : hub.date;
            await editHub(name, description, imageUrl, price, category, date, +req.params.id);
            const updatedHubs = await getHubs();
            res.send(updatedHubs);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send({ error: 'An error occurred while updating Product by ID' });
        }
    }

}
