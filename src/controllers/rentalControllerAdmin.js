const axios = require ('axios')

const getAllUserRental = async (req, res) => {
    try {
        const response = await axios.get(`https://rent-book-api-admin.vercel.app/admin/rental`,{
            headers: {
                "Authorization" : `Bearer ${req.token}`
            }
        })
        res.json(response.data)
    } catch (error) {
        res.json(error.response.data)
    }
}

const getUserRentalById = async (req, res) => {
    let { rentalId } = req.params
    try {
        const response = await axios.get(`https://rent-book-api-admin.vercel.app/admin/rental/${rentalId}`,{
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
    getAllUserRental,
    getUserRentalById
}