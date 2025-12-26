import { Request, Response } from 'express';
import * as ChatService from './chat.service';

 export const sendMessage = async (
  req: Request & { user?: any },
  res: Response
) => {
  const { message, chatId } = req.body;
  const userId = req.user?._id;

  console.log("Received message:", { userId, chatId, message });

  await ChatService.createUserMessage(userId, message, chatId);

  res.status(202).json({
    success: true,
    message: 'Message queued',
  });
};


export const getChats = async (
  req: Request & { user?: any },
  res: Response
) => {
  const { chatId } = req.query;
  const chats = await ChatService.getUserChats(req.user._id, chatId as string );
  res.json(chats);
};

export const createNewChat = async (
  req: Request & { user?: any },  
  res: Response
) => {
  const chat = await ChatService.createNewChatId(req.user._id);
  res.status(201).json(chat);
};

export const getChatList = async (
  req: Request & { user?: any },
  res: Response
) => {
  const chatList = await ChatService.getUserChatList(req.user._id);
  res.json(chatList);
};
