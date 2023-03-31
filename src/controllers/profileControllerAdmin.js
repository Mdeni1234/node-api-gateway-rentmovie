const axios = require('axios')

const getAllUserProfile = async (req, res) => {
    try {
        const response = await axios.get(`https://node-api-admin-rentmovie.vercel.app/admin/user-profile`,{
            headers: {
                Authorization : `Bearer ${req.token}`
            }
        })
        if(response.length === 0) throw new Error("All Profile Data is Empty")

        res.status(200).json(response.data)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

const getProfileByUserId = async (req, res) => {
    try {
        let {userId} = req.params
        userId = Number(userId)

        if(isNaN(userId) || typeof userId === 'string') throw new Error(`Id must be a number`)

        const response = await axios.get(`https://node-api-admin-rentmovie.vercel.app/admin/user-profile/${userId}`)

        if(response.length === 0) throw new Error(`Profile with id ${userId} not found`)

        res.status(200).json(response.data)
    }catch(error){
        res.status(400).json(error.response.data)
    }
}

module.exports = {
    getAllUserProfile,
    getProfileByUserId
}