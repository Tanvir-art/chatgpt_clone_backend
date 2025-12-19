import { chatQueue } from '../../queue/chat.queue';
import { ChatModel } from './chat.model'; 
import { Types } from 'mongoose';

export const createUserMessage = async (
  userId: string,
  message: string
) => {
  // save user message
  console.log("Creating user message:", { userId, message });
  await ChatModel.create({
    user: new Types.ObjectId(userId),
    role: 'user',
    content: message,
  });

  // push job to queue
  await chatQueue.add(
    'process-chat',
    {
      userId,
      message,
    },
    {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
    }
  );
};

export const getUserChats = async (userId: string) => {
  return ChatModel.find({ user: userId }).sort({ createdAt: 1 });
};
