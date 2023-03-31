const axios = require("axios");
const userUrl = require("../utils/url");
const config = (req) => {
  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${req.token}`,
    },
  };
  return header;
};
const getRental = async (req, res) => {
  console.log(req.user);
  const rental = await axios.get(`${userUrl}/rental`, config(req));
  rental ? res.json(rental.data) : res.send("Data Empty");
};
const getRentalById = async (req, res) => {
  let { id } = req.params;
  try {
    const rental = await axios.get(`${userUrl}/rental/${id}`, config(req));
    rental.data.length ? res.json(rental.data) : res.send("Data Empty");
  } catch (error) {
    res.json(error.message);
  }
};
const getRentalActive = async (req, res) => {
  let { id } = req.params;
  try {
    const rental = await axios.get(
      `${userUrl}/rental/active/${id}`,
      config(req)
    );
    rental.data.length ? res.json(rental.data) : res.json([]);
  } catch (error) {
    res.json(error.message);
  }
};
const getRentalPending = async (req, res) => {
  let { id } = req.params;
  try {
    const rental = await axios.get(
      `${userUrl}/rental/pending/${id}`,
      config(req)
    );
    rental.data.length ? res.json(rental.data) : res.json([]);
  } catch (error) {
    res.json(error.message);
  }
};
const getRentalByUserId = async (req, res) => {
  let { id } = req.params;
  try {
    const rental = await axios.get(`${userUrl}/rental/user/${id}`, config(req));
    console.log(rental);
    rental.data.length ? res.json(rental.data) : res.send("Data Empty");
  } catch (error) {
    res.json(error.message);
  }
};
const postItem = (listItem, id, config) => {
  let list = [];
  listItem.map((item) => {
    list = [...list, item.id];
  });
  list = { item_id: [...list], rental_id: id };
  console.log(list);
  axios
    .post(`${userUrl}/rentalitem`, list, config)
    .then((e) => console.log(e.data));
};
const postPayment = (rental_id, price, order, status, config) => {
  const raw = {
    rental_id: rental_id,
    price: price,
    order_id: order,
    status: status,
  };
  console.log(raw);
  axios
    .post(`${userUrl}/payment`, raw, config)
    .then((e) => console.log(e.data));
};
const postRental = async (req, res) => {
  let { listItem, order_id, price, status } = req.body;
  let { id } = req.user;
  const conf = config(req);
  const raw = {
    user_id: id,
  };
  try {
    const rental = await axios.post(`${userUrl}/rental`, raw, conf);
    const rental_id = rental.data[0].id;
    postPayment(rental_id, price, order_id, status, conf);
    postItem(listItem, rental_id, conf);
    res.json(rental.data);
  } catch (error) {
    res.send(error.message);
  }
};
const deleteRental = async (req, res) => {
  let { id } = req.params;
  try {
    const rental = await axios.delete(`${userUrl}/rental/${id}`, config(req));
    res.json("rental succesfully deleted");
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getRental,
  getRentalById,
  getRentalByUserId,
  postRental,
  deleteRental,
  getRentalActive,
  getRentalPending,
};
