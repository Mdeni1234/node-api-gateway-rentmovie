const axios = require('axios')

const register = async (req, res) => {
    let {name, email, password} = req.body
    try {
        const response = await axios.post("https://node-api-user-rent-movie.vercel.app/register", { name, email, password })
        const user = res.json(response.data)
        return user
    } catch (err) {
        console.log(err)
    }
}

const login = async (req, res) => {
    let { email, password} = req.body
    try {
        const response = await axios.post("https://node-api-user-rent-movie.vercel.app/login", { email, password })
        const user = res.json(response.data)
        return user
    } catch (err) {
        console.log(err)
    }
}

const changePassword = async (req, res) => {
    const token = req.token
    let {currentPassword, newPassword, confirmNewPassword} = req.body

    try {
        const response = await axios.patch(`https://node-api-user-rent-movie.vercel.app/change-password/`, { currentPassword, newPassword, confirmNewPassword }, {headers: {"Authorization": "Bearer " + token}})
        const user = res.json(response.data)
        return user
    } catch (err) {
        console.log(err)
    }
}

module.exports = {register, login, changePassword}