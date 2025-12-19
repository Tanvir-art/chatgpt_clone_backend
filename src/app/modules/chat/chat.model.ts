import { Schema, model, Types } from 'mongoose';
import { IChatMessage } from './chat.interface';

const chatSchema = new Schema<IChatMessage>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'assistant'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const ChatModel = model<IChatMessage>(
  'ChatMessage',
  chatSchema
);
