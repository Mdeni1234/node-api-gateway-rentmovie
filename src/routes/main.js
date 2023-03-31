const express = require("express");

const { register, login, changePassword } = require("../controllers/auth");
const { getUser } = require("../controllers/user");
const { jwtToken } = require("../controllers/token");
const { getProfile, updateProfile } = require("../controllers/profile");
const {
  getItem,
  getItemById,
  getItemByCategory,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");
const {
  getGenreAll,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
} = require("../controllers/genreController");
const {
  setGenre,
  removeGenre,
  getItemGenre,
} = require("../controllers/itemGenreController");

const {
  getCart,
  getCartByUserId,
  postCart,
  deleteCart,
} = require("../controllers/cartController");
const {
  createPayment,
  getPayment,
  getPaymentById,
  postPayment,
  deletePayment,
} = require("../controllers/paymentController");
const {
  getRental,
  getRentalById,
  getRentalByUserId,
  postRental,
  deleteRental,
  getRentalActive,
} = require("../controllers/rentalController");

const { jwtAuth, ensureAdmin } = require("../controllers/jwt");
const {
  getAllUsers,
  getUserById,
  deleteUserById,
} = require("../controllers/userController");
const {
  getAllUserRental,
  getUserRentalById,
} = require("../controllers/rentalControllerAdmin");
const {
  getAllUserPayment,
  getUserPaymentById,
} = require("../controllers/paymentControllerAdmin");
const { getAllUserProfile, getProfileByUserId } = require("../controllers/profileControllerAdmin");

const router = express.Router();

router.get("/rental", jwtAuth, getRental);
router.get("/rental/:id", jwtAuth, getRentalById);
router.get("/rental/active/:id", jwtAuth, getRentalActive);
router.get("/rental/pending/:id", jwtAuth, getRentalActive);
router.get("/rental/user/:id", jwtAuth, getRentalByUserId);
router.post("/rental", jwtAuth, postRental);
router.delete("/rental/:id", jwtAuth, deleteRental);

router.post("/createpayment", jwtAuth, createPayment);
router.get("/payment", jwtAuth, getPayment);
router.get("/payment/:id", jwtAuth, getPaymentById);
router.post("/payment", jwtAuth, postPayment);
router.delete("/payment/:id", jwtAuth, deletePayment);

router.get("/cart", jwtAuth, getCart);
router.get("/cart/:id", jwtAuth, getCartByUserId);
router.post("/cart", jwtAuth, postCart);
router.delete("/cart", jwtAuth, deleteCart);

// router Item
router.get("/item", getItem);
router.get("/item/:id", getItemById);
router.get("/item-category/:category", getItemByCategory);
router.post("/item", jwtAuth, ensureAdmin, createItem);
router.patch("/item/:id", jwtAuth, ensureAdmin, updateItem);
router.delete("/item/:id", jwtAuth, ensureAdmin, deleteItem);

// router Genre
router.get("/genre", getGenreAll);
router.get("/genre/:id", getGenreById);
router.post("/genre", jwtAuth, ensureAdmin, createGenre);
router.patch("/genre/:id", jwtAuth, ensureAdmin, updateGenre);
router.delete("/genre/:id", jwtAuth, ensureAdmin, deleteGenre);

// router Item's Genre
router.get("/item-genre", jwtAuth, ensureAdmin, getItemGenre);
router.post("/item/:id/set-genre", jwtAuth, ensureAdmin, setGenre);
router.delete("/item/:id/set-genre", jwtAuth, ensureAdmin, removeGenre);

router.post("/register", register);
router.post("/login", login);
router.patch("/change-password", jwtToken, changePassword);

router.get("/user", jwtToken, getUser);
router.get("/profile", jwtToken, getProfile);
router.patch("/profile", jwtToken, updateProfile);

//router User by Admin
router.get("/admin/user", jwtAuth, ensureAdmin, getAllUsers);
router.get("/admin/user/:userId", jwtAuth, ensureAdmin, getUserById);
router.delete("/admin/user/:userId", jwtAuth, ensureAdmin, deleteUserById);

//router User Rental by Admin
router.get("/admin/rental", jwtAuth, ensureAdmin, getAllUserRental);
router.get("/admin/rental/:rentalId", jwtAuth, ensureAdmin, getUserRentalById);

//router User Payment by Admin
router.get("/admin/payment", jwtAuth, ensureAdmin, getAllUserPayment);
router.get(
  "/admin/payment/:paymentId",
  jwtAuth,
  ensureAdmin,
  getUserPaymentById
);

//router User by Admin
router.get("/admin/user", jwtAuth, ensureAdmin, getAllUsers);
router.get("/admin/user/:userId", jwtAuth, ensureAdmin, getUserById);
router.delete("/admin/user/:userId", deleteUserById);

//router User Rental by Admin
router.get("/admin/rental", jwtAuth, ensureAdmin, getAllUserRental);
router.get("/admin/rental/:rentalId", jwtAuth, ensureAdmin, getUserRentalById);

//router User Payment by Admin
router.get("/admin/payment", jwtAuth, ensureAdmin, getAllUserPayment);
router.get(
  "/admin/payment/:paymentId",
  jwtAuth,
  ensureAdmin,
  getUserPaymentById
);

//router User Profile by Admin
router.get("/admin/user-profile", jwtAuth, ensureAdmin, getAllUserProfile)
router.get(
  "/admin/user-profile/:userId", 
  jwtAuth, 
  ensureAdmin, 
  getProfileByUserId)

router.post("/register", register);
router.post("/login", login);
router.patch("/change-password", jwtToken, changePassword);

router.get("/user", jwtToken, getUser);
router.get("/profile", jwtToken, getProfile);
router.patch("/profile", jwtToken, updateProfile);

router.get("/", (req, res) => res.status(200).json("Welcome to API Gateway"));

router.get("*", (req, res) =>
  res.status(400).json({ message: "Page Not Found" })
);

module.exports = router;
