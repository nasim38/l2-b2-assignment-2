import { z } from "zod";

const productValidationSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

// Defining the User validation schema using Zod
const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: z.object({
    firstName: z.string().min(1).max(20),
    lastName: z.string().min(1).max(20),
  }),
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  }),
  orders: z.array(productValidationSchema).optional(),
});

export { userValidationSchema, productValidationSchema };
