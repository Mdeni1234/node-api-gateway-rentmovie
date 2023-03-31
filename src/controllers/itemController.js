const axios = require("axios");

const createItem = async (req,res) => {
    const item_properties = req.body;
    try {
        const response = await axios.post(
            "https://rent-book-api-admin.vercel.app/item",
            item_properties, {
                headers: {
                  "Authorization": `Bearer ${req.token}`
                }
            }
        );
        res.json(response.data);
    } catch(err) {
        console.log(err)
        res.json(err)
    }
}

const updateItem = async (req,res) => {
    let {id} = req.params;
    id = Number(id);
    const item_properties = req.body;
    try {
        const response = await axios.patch(
            `https://rent-book-api-admin.vercel.app/item/${id}`,
            item_properties, {
                headers: {
                  "Authorization": `Bearer ${req.token}`
                }
              });
        res.json(response.data);
    } catch(err) {
        console.log(err)
        res.json(err)
    }
}

const deleteItem = async (req,res) => {
    let {id} = req.params;
    id = Number(id);
    try {
        const response = await axios.delete(
            `https://rent-book-api-admin.vercel.app/item/${id}`, {
            headers: {
                "Authorization": `Bearer ${req.token}`
            } }
        );
        res.json(response.data);
    } catch(err) {
        console.log(err)
        res.json(err)
    }
}

const getItem = async (req, res) => {
    try {
        const response = await axios.get(`https://rent-book-api-user.vercel.app/item`);
        res.json(response.data);
    } catch(err) {
        console.log(err);
        res.json(err);
    }
}

const getItemById = async (req, res) => {
    let {id} = req.params;
    id = Number(id);
    try {
        const response = await axios.get(`https://rent-book-api-user.vercel.app/item/${id}`);
        res.json(response.data);
    } catch(err) {
        console.log(err);
        res.json(err);
    }
}

const getItemByCategory = async (req, res) => {
    let {category} = req.params;
    try {
        if (category !== 'movie' && category !== 'book') throw {message: "invalid category"}
        const response = await axios.get(`https://rent-book-api-user.vercel.app/item-category/${category}` );
        res.json(response.data);
    } catch(err) {
        console.log(err);
        res.json(err);
    }
}

module.exports = {
    getItem,
    getItemById,
    getItemByCategory,
    createItem,
    updateItem,
    deleteItem
}