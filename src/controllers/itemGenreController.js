const axios = require("axios");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getItemGenre = async (req, res) => {
    try {
        const response = await axios.get(
            `https://rent-book-api-admin.vercel.app/item-genre`,
            {
                headers: {
                  "Authorization": `Bearer ${req.token}`
                }
            }
        );
        res.json(response.data);
    } catch(err) {
        console.error(err);
        res.json(err);
    }
}

const setGenre = async (req, res) => {
    let {id:item_id} = req.params;
    const {genre_id} = req.body;
    try {
        const response = await axios.post(
            `https://rent-book-api-admin.vercel.app/item/${item_id}/set-genre`,
            {genre_id}, {
                headers: {
                  "Authorization": `Bearer ${req.token}`
                }
              }
        );
        res.json(response.data)
    } catch (err) {
        console.error(err);
        res.json(err);
    }
}

const removeGenre = async (req, res) => {
    let {id:item_id} = req.params;
    item_id = Number(item_id);
    let {genre_id} = req.body;
    genre_id = Number(genre_id);
    try {
        if (isNaN(item_id) || isNaN(Number(genre_id))) throw {message: "id should be a number"}
        const exist_genre = await prisma.itemGenre.findFirst({
            where : {
                item_id,
                genre_id
            }
        })
        if (!exist_genre) throw {message: 'Genre doesn\'t exist in this item'}
        const item_genre = await prisma.itemGenre.deleteMany({
            where : {
                item_id,
                genre_id
            }
        });
        res.json({message: 'Genre succesfully removed', item_genre});
    } catch (err) {
        console.error(err)
        res.json({message:err.message, genre_id})
    }
}


module.exports = {
    setGenre,
    removeGenre,
    getItemGenre
}