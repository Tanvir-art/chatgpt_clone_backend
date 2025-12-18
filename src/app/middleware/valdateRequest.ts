// import type { NextFunction, Request, Response } from 'express';
// import type { ZodTypeAny } from 'zod';
// import catchAsync from '../utils/catchAsync.js';

// const validateRequest = (schema: ZodTypeAny) => {
//   return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     await schema.parseAsync({
//       body: req.body,
//       cookies: req.cookies,
//     });

//     next();
//   });
// };

// export default validateRequest;



import type { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import type { ZodType } from 'zod';

const validateRequest =
  <Schema extends ZodType<any, any, any>>(schema: Schema) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });

    next();
  });

export default validateRequest;
