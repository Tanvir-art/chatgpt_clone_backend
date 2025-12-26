import { Types } from 'mongoose';

export interface IChatMessage {
  user: Types.ObjectId;
  role: 'user' | 'assistant';
  chatId: string;
  title: string | null;
  content: string;
  createdAt?: Date;
}
