import { Request, Response } from "express";
import userServices from "./user.service";
import {
  userValidationSchema,
  productValidationSchema,
} from "./user.validation";

const sendErrResponse = (statusCode: number, description: string, err: any) => {
  return {
    success: false,
    message: err.message || "Something went wrong",
    error: {
      code: statusCode,
      description: description,
    },
  };
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await userServices.getAllUsers();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: allUsers,
    });
  } catch (err) {
    res.status(404).json(sendErrResponse(404, "Users not found", err));
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = Number.parseInt(req.params.userId);

    const user = await userServices.getSingleUser(userId);
    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: user,
    });
  } catch (err) {
    res.status(404).json(sendErrResponse(404, "User not found", err));
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = Number.parseInt(req.params.userId);
    const updateData = userValidationSchema.parse(req.body);
    const user = await userServices.updateSingleUser(userId, updateData);
    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: user,
    });
  } catch (err) {
    res.status(500).json(sendErrResponse(500, "User could not updated", err));
  }
};

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = Number.parseInt(req.params.userId);

    const deleteCount = await userServices.deleteSingleUser(userId);
    if (deleteCount) {
      res.status(200).json({
        success: true,
        message: "User deleted successfully!",
        data: null,
      });
    } else throw new Error("User could not deleted");
  } catch (err) {
    res.status(500).json(sendErrResponse(500, "User could not deleted", err));
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    // validating req body with zod schema
    const newUserData = userValidationSchema.parse(req.body);
    const newlyCreatedUser = await userServices.createUser(newUserData);
    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: newlyCreatedUser,
    });
  } catch (err) {
    res.status(400).json(sendErrResponse(400, "User creation failed", err));
  }
};

// methods for user order mgt
const addNewOrder = async (req: Request, res: Response) => {
  try {
    const userId = Number.parseInt(req.params.userId);
    const newOrderData = productValidationSchema.parse(req.body);
    await userServices.updateUserOrder(userId, newOrderData);
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: null,
    });
  } catch (err) {
    res.status(500).json(sendErrResponse(500, "Order could not placed", err));
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const userId = Number.parseInt(req.params.userId);
    const orderArray = await userServices.getAllOrders(userId);
    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data: orderArray,
    });
  } catch (err) {
    res.status(404).json(sendErrResponse(404, "Orders not found", err));
  }
};

const getOrderTotalPrice = async (req: Request, res: Response) => {
  try {
    const userId = Number.parseInt(req.params.userId);
    const totalPrice = await userServices.getOrderTotalPrice(userId);
    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: totalPrice,
    });
  } catch (err) {
    res
      .status(400)
      .json(sendErrResponse(400, "Total price could not calculated!", err));
  }
};

export {
  getAllUsers,
  createUser,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  addNewOrder,
  getAllOrders,
  getOrderTotalPrice,
};
