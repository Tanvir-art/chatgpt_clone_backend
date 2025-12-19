import { Types } from 'mongoose';

export interface IChatMessage {
  user: Types.ObjectId;
  role: 'user' | 'assistant';
  content: string;
  createdAt?: Date;
}
