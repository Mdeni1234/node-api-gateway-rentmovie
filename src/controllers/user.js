const axios = require('axios')

const getUser = async (req, res) => {
    const token = req.token
    
    try {
        const response = await axios.get(`https://node-api-user-rent-movie.vercel.app/`, {headers: {"Authorization": "Bearer " + token}})
        const user = res.json(response.data)
        return user
    } catch (err) {
        console.log(err)
    }
}

module.exports = {getUser}