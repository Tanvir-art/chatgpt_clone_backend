import { Router } from 'express'; 
import { userRoutes } from '../modules/user/user.route'; 
import { meRoutes } from '../modules/user/user.me'; 

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: userRoutes,
  },
  {
    path: '/users',
    route: meRoutes,
  },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
