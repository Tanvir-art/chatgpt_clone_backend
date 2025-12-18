import { z } from "zod";

const userValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty("name is required"),
    email: z.string().nonempty("email is required").email("email must be valid"),
    password: z
      .string()
      .nonempty("password is required")
      .max(20, "Password can not be more than 20 characters"),
    phone: z.string().nonempty("phone is required"),
    address: z.string().nonempty("address is required"),
    // role: z.enum(["admin", "user"]),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().nonempty("email is required").email("email must be valid"),
    password: z.string().nonempty("password is required"),
  }),
});

const updateUserSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
  }),
});

const userUpdateByAdminSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    role: z.enum(["admin", "user"]).optional(),
  }),
});

export const UserValidation = {
  userValidationSchema,
  loginSchema,
  updateUserSchema,
  userUpdateByAdminSchema,
};
