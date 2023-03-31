const axios = require("axios")
const jwt = require('jsonwebtoken')


const getGenreAll = async (req,res) => {
    try {
        const response = await axios.get(`https://rent-book-api-user.vercel.app/genre` );
        res.json(response.data);
    } catch(err) {
        console.error(err);
        res.json(err);
    }
}

const getGenreById = async (req,res) => {
    let {id} = req.params;
    try {
        const response = await axios.get(`https://rent-book-api-user.vercel.app/genre/${id}` );
        res.json(response.data);
    } catch(err) {
        console.error(err);
        res.json(err);
    }
}

const createGenre = async (req,res) => {
    const {name} = req.body;
    try {
        const response = await axios.post(
            `https://rent-book-api-admin.vercel.app/genre`,
            {name}, 
            {
                headers: {Authorization: `Bearer ${req.token}`}
            });
        res.json(response.data);
    } catch(err) {
        console.error(err);
        res.json(err);
    }
}

const updateGenre = async (req,res) => {
    const {name} = req.body;
    let {id} = req.params;
    try {
        const response = await axios.patch(
            `https://rent-book-api-admin.vercel.app/genre/${id}`,
            {name}, 
            {
                headers: {Authorization: `Bearer ${req.token}`}
            }
        );
        res.json(response.data)
    } catch(err) {
        console.error(err);
        res.json(err);
    }
}

const deleteGenre = async (req,res) => {
    let {id} = req.params;
    try {
        const response = await axios.delete(
            `https://rent-book-api-admin.vercel.app/genre/${id}`, 
            {
                headers: {Authorization: `Bearer ${req.token}`}
            }
        );
        res.json(response.data)
    } catch(err) {
        console.error(err);
        res.json(err);
    }
}

// const getProfileByUserId = async (req,res) => {
//     try {
//         const decodedToken = jwt.verify(req.token, process.env.TOKEN_SECRET)
//         const response = await axios.get(`https://rent-book-api-user.vercel.app/profile`,
//         {
//           headers: {
//             "Authorization": `Bearer ${req.token}`
//           }
//         })
//         console.log(response.data)
//         res.json(response.data)
//     } catch(err) {
//         console.log(err)
//         res.json(err)
//     }
// }

module.exports = {
    getGenreAll,
    getGenreById,
    createGenre,
    updateGenre,
    deleteGenre
}