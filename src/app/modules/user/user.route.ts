import express from "express";
import {
  getAllUsers,
  createUser,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  addNewOrder,
  getAllOrders,
  getOrderTotalPrice,
} from "./user.controller";

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:userId", getSingleUser);
router.put("/:userId", updateSingleUser);
router.delete("/:userId", deleteSingleUser);

// user order routes
router.put("/:userId/orders", addNewOrder);
router.get("/:userId/orders", getAllOrders);
router.get("/:userId/orders/total-price", getOrderTotalPrice);

const userRoutes = router;
export default userRoutes;
