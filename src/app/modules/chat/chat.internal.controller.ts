import { Request, Response } from 'express';
import { ChatModel } from './chat.model';
import { emitToUser } from '../../websocket/socket';
import { Types } from 'mongoose';


 export const receiveChatResponse = async (req : Request, res : Response) => {
  try {
    const { user: userId, message, chatId } = req.body;

    console.log("Received internal chat response:", req.body);

    await ChatModel.create({
      user: new Types.ObjectId(userId),
      role: 'assistant',
      content: message,
      chatId
    });

    emitToUser(userId, 'message', {
      role: 'assistant',
      content: message,
      chatId
    });

    res.sendStatus(200);

  } catch (err) {
    console.error("Internal chat error:", err);
    res.status(500).json({ message: 'Internal error', error: err });
  }
};
