

import {getHubs, getHub, addHub, deleteHub, editHub} from '../models/hubDatabase.js'


export default {

    getMany: async(req,res)=>{
        res.send(await getHubs())
        },

    postMany: async (req,res)=>{
        const {name, description, imageUrl, price, category, date} = req.body
        const post = await addHub(name, description, imageUrl, price, category, date)
        res.send(await getHubs())
        },

    getID: async(req,res)=>{
        res.send(await getHub(+req.params.id))
        },

    deleteID: async (req,res)=>{
        await deleteHub(req.params.id)
        res.json(await getHubs())
        },

    patchID: async (req,res)=>{
        const [Hubs] = await getHubs(+req.params.id)
        let {name, description, imageUrl, price, category, date} = req.body
        name ? name = name: {name} = Hubs
        description ? description = description: {description} = Hubs
        imageUrl ? imageUrl = imageUrl: {imageUrl} = Hubs
        price ? price = price: {price} = Hubs
        category ? category = category: {category} = Hubs
        date ? date = date: {date} = Hubs
        await editHub(name, description, imageUrl, price, category, date, +req.params.id)
        res.json(await getHubs())
        }

}

// make user controller, this is for products(HUBS)