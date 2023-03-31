const axios = require("axios");
const userUrl = require("../utils/url");
const config = (req) => {
  const header = {
    headers: {
      Authorization: `Bearer ${req.token}`,
    },
  };
  return header;
};
const getCart = async (req, res) => {
  const wishlist = await axios.get(`${userUrl}/cart`, config(req));
  wishlist.data.length ? res.json(wishlist.data) : res.send("Data Empty");
};
const getCartByUserId = async (req, res) => {
  let { user_id } = req.user;
  try {
    const cart = await axios.get(`${userUrl}/cart/${user_id}`, config(req));
    cart.data ? res.json(cart.data) : res.send("Data Empty");
  } catch (error) {
    res.json(error.message);
  }
};

const postCart = async (req, res) => {
  let { item_id } = req.body;
  let { user_id } = req.user;
  const raw = {
    item_id,
    user_id,
  };
  try {
    const cart = await axios.post(`${userUrl}/cart`, raw, config(req));
    res.json(cart.data);
  } catch (error) {
    res.send(error.message);
  }
};
const deleteCart = async (req, res) => {
  let { id } = req.body;
  const conf = { ...config(req), data: { item: id } };
  try {
    const cart = await axios.delete(`${userUrl}/cart`, conf);
    res.json("cart succesfully deleted");
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getCart,
  getCartByUserId,
  postCart,
  deleteCart,
};
