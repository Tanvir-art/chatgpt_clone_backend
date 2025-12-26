import { chatQueue } from '../../queue/chat.queue';
import { ChatModel } from './chat.model'; 
import { Types } from 'mongoose';

export const createUserMessage = async (
  userId: string,
  message: string,
  chatId: string
) => {
  console.log("Creating user message:", { userId, chatId, message });

  await ChatModel.create({
    user: new Types.ObjectId(userId),
    role: 'user',
    content: message,
    chatId
  });

  // queue job
  await chatQueue.add(
    'process-chat',
    { userId, message, chatId },
    {
      attempts: 3,
      backoff: { type: 'exponential', delay: 2000 },
    }
  );
};


 export const getUserChats = async (userId: string, chatId: string) => {
  const chats = await ChatModel
    .find({ user: userId, chatId })
    .sort({ createdAt: 1 });

  if (!chats.length) return null;

  // find doc which actually has title
  const header = chats.find(c => c.title);

  return {
    chatId,
    title: header?.title || 'New Chat',
    messages: chats.map(c => ({
      role: c.role,
      content: c.content,
      createdAt: c.createdAt
    }))
  };
};




export const createNewChatId = async (userId: string) => {
  const chatId = new Types.ObjectId().toString();
  return { chatId };
};


export const getUserChatList = async (userId: string) => {
  // aggregate by chatId to get last message and title
  const chats = await ChatModel.aggregate([
    { $match: { user: new Types.ObjectId(userId) } },
    { 
      $sort: { createdAt: -1 } // newest first
    },
    {
      $group: {
        _id: "$chatId",
        title: { $first: "$title" },
        lastMessage: { $first: "$content" },
        updatedAt: { $first: "$updatedAt" }
      }
    },
    { $sort: { updatedAt: -1 } } // optional: sort threads by latest activity
  ]);

  return chats.map(c => ({
    chatId: c._id,
    title: c.title || 'New Chat',
    lastMessage: c.lastMessage
  }));
};
