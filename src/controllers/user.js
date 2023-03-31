const axios = require('axios')

const getUser = async (req, res) => {
    const token = req.token
    
    try {
        const response = await axios.get(`https://rent-book-api-user.vercel.app/user/`, {headers: {"Authorization": "Bearer " + token}})
        const user = res.json(response.data)
        return user
    } catch (err) {
        console.log(err)
    }
}

module.exports = {getUser}