import { getHubs, getHub, addHub, deleteHub, editHub } from '../models/hubDatabase.js';

export default {
    getMany: async (req, res) => {
        try {
            res.send(await getHubs());
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send({ error: 'An error occurred while fetching hubs' });
        }
    },

    postMany: async (req, res) => {
        try {
            const { name, description, imageUrl, price, category, date } = req.body;
            await addHub(name, description, imageUrl, price, category, date);
            res.send(await getHubs());
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send({ error: 'An error occurred while adding hub' });
        }
    },

    getID: async (req, res) => {
        try {
            res.send(await getHub(+req.params.id));
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send({ error: 'An error occurred while fetching hub by ID' });
        }
    },

    deleteID: async (req, res) => {
        try {
            await deleteHub(req.params.id);
            res.json(await getHubs());
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send({ error: 'An error occurred while deleting hub by ID' });
        }
    },

    patchID: async (req, res) => {
        try {
            const [Hubs] = await getHubs(+req.params.id);
            let { name, description, imageUrl, price, category, date } = req.body;
            name ? name = name : { name } = Hubs;
            description ? description = description : { description } = Hubs;
            imageUrl ? imageUrl = imageUrl : { imageUrl } = Hubs;
            price ? price = price : { price } = Hubs;
            category ? category = category : { category } = Hubs;
            date ? date = date : { date } = Hubs;
            await editHub(name, description, imageUrl, price, category, date, +req.params.id);
            res.json(await getHubs());
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send({ error: 'An error occurred while patching hub' });
        }
    }
};
