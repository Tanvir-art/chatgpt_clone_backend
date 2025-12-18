// import { Request } from "express";

// declare module "express-serve-static-core" {
//   interface Request {
//     user?: {
//       _id: string;
//       name: string;
//       email: string;
//       role?: string; 
//     };
//   }
// }



import { Request } from "express";

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
role?: string | undefined; // explicit undefined
}

declare module "express-serve-static-core" {
  interface Request {
    user?: AuthUser;
  }
}
