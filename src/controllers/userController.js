const axios = require('axios')
const { json } = require('express')

const getAllUsers = async (req, res) => {
    try {
        const response = await axios.get('https://rent-book-api-admin.vercel.app/admin/user',{
            headers: {
                "Authorization" : `Bearer ${req.token}`
            }
        })
        res.json(response.data)
    } catch (error) {
        res.json(error.message)
    }
}

const getUserById = async (req, res) => {
    let { userId } = req.params
    try {
        const response = await axios.get(`https://rent-book-api-admin.vercel.app/admin/user/${userId}`,{
            headers: {
                "Authorization" : `Bearer ${req.token}`
            }
        })
        res.json(response.data)
    } catch (error) {
        console.log(error)
        res.json(error.response.data)
    }
}

const deleteUserById = async (req, res) => {
    let { userId } = req.params
    try {
        const response = await axios.delete(`https://rent-book-api-admin.vercel.app/admin/user/${userId}`,{
            headers: {
                "Authorization" : `Bearer ${req.token}`
            }
        })
        res.json(response.data)
    } catch (error) {
        res.json(error.response.data)
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    deleteUserById
}