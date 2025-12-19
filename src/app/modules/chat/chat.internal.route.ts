import { Router } from 'express'; 
import { internalAuth } from '../../middleware/internalAuth';
import { receiveChatResponse } from './chat.internal.controller';
 
 

const router = Router();

router.post(
  '/response', 
  internalAuth,
  receiveChatResponse
);

export const chatInternalRoutes = router;
