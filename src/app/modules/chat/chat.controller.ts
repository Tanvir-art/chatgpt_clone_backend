import { Request, Response } from 'express';
import * as ChatService from './chat.service';

export const sendMessage = async (
  req: Request & { user?: any },
  res: Response
) => {
  const { message } = req.body;
  const userId = req.user?._id;

  console.log("Received message from user:", { userId, message });

  await ChatService.createUserMessage(userId, message);

  res.status(202).json({
    success: true,
    message: 'Message queued',
  });
};

export const getChats = async (
  req: Request & { user?: any },
  res: Response
) => {
  const chats = await ChatService.getUserChats(req.user._id);
  res.json(chats);
};
