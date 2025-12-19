import { Server } from 'socket.io';

let io: Server;

export const initSocket = (httpServer: any) => {
  io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    socket.on('join', (userId: string) => {
      socket.join(userId);
    });
  });
};

export const emitToUser = (
  userId: string,
  event: string,
  payload: any
) => {
  io.to(userId).emit(event, payload);
};
