import { Router } from 'express'; 
import { userRoutes } from '../modules/user/user.route'; 
import { meRoutes } from '../modules/user/user.me'; 
import { chatInternalRoutes } from '../modules/chat/chat.internal.route';
import path from 'node:path';
import { chatRoutes } from '../modules/chat/chat.route';

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
  {
    path: '/chat/internal',
    route : chatInternalRoutes,
  }, 
  {
    path: '/chat',
    route : chatRoutes
  }

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
