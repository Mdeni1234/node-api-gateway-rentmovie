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
const createPayment = async (req, res) => {
  const { item, profile } = req.body;

  const raw = {
    item: item,
    profile,
  };
  const payment = await axios.post(
    `${userUrl}/createpayment`,
    raw,
    config(req)
  );

  payment.data ? res.json(payment.data) : res.send("Data Empty");
};

const getPayment = async (req, res) => {
  const payment = await axios.get(`${userUrl}/payment`, config(req));
  payment.data.length ? res.json(payment.data) : res.send("Data Empty");
};
const getPaymentById = async (req, res) => {
  let { id } = req.params;
  try {
    const payment = await axios.get(`${userUrl}/payment/${id}`, config(req));

    payment.data ? res.json(payment.data) : res.send("Data Empty");
  } catch (error) {
    res.json(error.message);
  }
};

const postPayment = async (req, res) => {
  let { rental_id, price, order_id, status } = req.body;
  const raw = {
    rental_id,
    price,
    status,
    order_id,
  };
  try {
    const payment = await axios.post(`${userUrl}/payment`, raw, config(req));
    res.json({ message: "rental successfully added", data: payment.data });
  } catch (error) {
    res.send(error.message);
  }
};
const deletePayment = async (req, res) => {
  let { id } = req.params;

  try {
    const payment = await axios.delete(`${userUrl}/payment/${id}`, config(req));

    res.json("payment succesfully deleted");
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getPayment,
  getPaymentById,
  postPayment,
  createPayment,
  deletePayment,
};
