import { Schema, model, Types } from 'mongoose';
import { IChatMessage } from './chat.interface';

const chatSchema = new Schema<IChatMessage>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    chatId: {
      type: String,
      required: true,
      index: true
    },

    title: {
      type: String,
      default: null
    },

    role: {
      type: String,
      enum: ['user', 'assistant'],
      required: true,
    },

    content: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export const ChatModel = model<IChatMessage>(
  'ChatMessage',
  chatSchema
);
