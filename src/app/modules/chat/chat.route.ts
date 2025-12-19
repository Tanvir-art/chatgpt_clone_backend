import { Router } from 'express';
import { sendMessage, getChats } from './chat.controller';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middleware/auth';
 

const router = Router();

router.post('/send', auth(USER_ROLE.user, USER_ROLE.admin), sendMessage);
router.get('/history', auth(USER_ROLE.user, USER_ROLE.admin), getChats);

export const chatRoutes = router;
