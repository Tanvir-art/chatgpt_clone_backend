import { Request, Response } from 'express';
import { ChatModel } from './chat.model';
import { emitToUser } from '../../websocket/socket';
import { Types } from 'mongoose';

// export const receiveChatResponse = async (
//   req: Request,
//   res: Response
// ) => {
//   const { user: userId, message } = req.body;
//   console.log('Received internal chat response for user:', req.body);

//   // save assistant message
//   await ChatModel.create({
//     // user: userId,
//     user: new Types.ObjectId(userId),
//     role: 'assistant',
//     content: message,
//   });

//   // send to frontend
//   emitToUser(userId, 'message', {
//     role: 'assistant',
//     content: message,
//   });

//   res.sendStatus(200);
// };


// import { Types } from 'mongoose';

export const receiveChatResponse = async (req : Request, res : Response) => {
  try {
    const { user: userId, message } = req.body;

    console.log("Received internal chat response:", req.body);

    await ChatModel.create({
      user: new Types.ObjectId(userId),   
      role: 'assistant',
      content: message,
    });

    emitToUser(userId, 'message', {
      role: 'assistant',
      content: message,
    });

    res.sendStatus(200);

  } catch (err) {
    console.error("Internal chat error:", err);
    res.status(500).json({ message: 'Internal error', error: err });
  }
};
