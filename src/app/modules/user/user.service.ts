import { Product, TUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (newUserData: TUser) => {
  try {
    const result = await User.create(newUserData);
    return result;
  } catch (err) {
    throw err;
  }
};

const getAllUsers = async () => {
  try {
    const result = await User.find().select(
      "username fullName age email address -_id"
    );
    return result;
  } catch (err) {
    throw err;
  }
};

const getSingleUser = async (userId: number) => {
  try {
    // checking for user existance
    if ((await User.isUserExists(userId)) === null) {
      throw new Error("User with given id does not exist");
    }
    const result = await User.findOne({ userId }).select(
      "-_id -password -orders"
    );
    return result;
  } catch (err) {
    throw err;
  }
};

const updateSingleUser = async (userId: number, updateData: TUser) => {
  try {
    // checking for user existance
    const existingUser = await User.isUserExists(userId);
    if (existingUser === null) {
      throw new Error("User with given id does not exist");
    }

    const result = await User.findOneAndUpdate({ userId }, updateData, {
      new: true,
    }).select("-_id -password -orders");
    return result;
  } catch (err) {
    throw err;
  }
};

const deleteSingleUser = async (userId: number) => {
  try {
    // checking for user existance
    const existingUser = await User.isUserExists(userId);
    if (existingUser === null) {
      throw new Error("User with given id does not exist");
    }

    const result = await User.deleteOne({ userId });
    return result.deletedCount;
  } catch (err) {
    throw err;
  }
};

const updateUserOrder = async (userId: number, newOrderData: Product) => {
  try {
    // checking for user existance
    const existingUser = await User.isUserExists(userId);
    if (existingUser === null) {
      throw new Error("User with given id does not exist");
    }
    if (!Array.isArray(existingUser?.orders)) existingUser.orders = [];
    existingUser.orders.push(newOrderData);
    await existingUser.save();
  } catch (err) {
    throw err;
  }
};

const getAllOrders = async (userId: number) => {
  try {
    // checking for user existance
    const existingUser = await User.isUserExists(userId);
    if (existingUser === null) {
      throw new Error("User with given id does not exist");
    }
    return existingUser?.orders;
  } catch (err) {
    throw err;
  }
};

const getOrderTotalPrice = async (userId: number) => {
  try {
    // checking for user existance
    const existingUser = await User.isUserExists(userId);
    if (existingUser === null) {
      throw new Error("User with given id does not exist");
    }
    // calculating total price
    let totalPrice = 0;
    if (existingUser?.orders.length > 0) {
      existingUser.orders.forEach((order) => {
        totalPrice += order.price;
      });
    }

    return { totalPrice };
  } catch (err) {
    throw err;
  }
};

const userServices = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  updateUserOrder,
  getAllOrders,
  getOrderTotalPrice,
};
export default userServices;
