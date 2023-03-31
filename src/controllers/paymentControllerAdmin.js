const axios = require ('axios')

const getAllUserPayment = async (req, res) => {
    try {
        const response = await axios.get(`https://node-api-admin-rentmovie.vercel.app/admin/payment`,{
            headers: {
                "Authorization" : `Bearer ${req.token}`
            }
        })
        res.json(response.data)
    } catch (error) {
        res.json(error.response.data)
    }
}

const getUserPaymentById = async (req, res) => {
    let { paymentId } = req.params
    try {
        const response = await axios.get(`https://node-api-admin-rentmovie.vercel.app/admin/payment/${paymentId}`,{
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
    getAllUserPayment,
    getUserPaymentById
}