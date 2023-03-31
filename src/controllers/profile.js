const axios = require('axios')

const getProfile = async (req, res) => {
    const token = req.token
    
    try {
        const response = await axios.get(`https://rent-book-api-user.vercel.app/profile/`, {headers: {"Authorization": "Bearer " + token}})
        const user = res.json(response.data)
        return user
    } catch (err) {
        console.log(err)
    }
}

const updateProfile = async (req, res) => {
    const token = req.token
    let {name, image_url, phone, address }= req.body 

    try {
        const response = await axios.patch(`https://rent-book-api-user.vercel.app/profile/`, { name, image_url, phone, address }, 
        {headers: 
            {"Authorization": "Bearer " + token}
        })
        const user = res.json(response.data)
        return user
    } catch (err) {
        console.log(err)
    }
}

module.exports = { getProfile, updateProfile }