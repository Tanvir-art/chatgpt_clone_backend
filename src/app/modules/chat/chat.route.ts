import { Router } from 'express';
import { sendMessage, getChats, createNewChat, getChatList } from './chat.controller';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middleware/auth';
 
 

const router = Router();

router.post('/send', auth(USER_ROLE.user, USER_ROLE.admin), sendMessage);
router.get('/history', auth(USER_ROLE.user, USER_ROLE.admin), getChats);
router.post('/create_new_chat', auth(USER_ROLE.user, USER_ROLE.admin), createNewChat);
router.get('/list', auth(USER_ROLE.user, USER_ROLE.admin), getChatList);


export const chatRoutes = router;
