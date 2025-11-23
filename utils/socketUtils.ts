
import type { Message, Viewer, FloatingGift } from '@/types/live.types';

export interface SocketEvents {
  // Client -> Server
  JOIN_ROOM: 'join_room';
  LEAVE_ROOM: 'leave_room';
  SEND_MESSAGE: 'send_message';
  SEND_GIFT: 'send_gift';
  
  // Server -> Client
  NEW_MESSAGE: 'new_message';
  NEW_GIFT: 'new_gift';
  VIEWER_JOINED: 'viewer_joined';
  VIEWER_LEFT: 'viewer_left';
  VIEWER_COUNT: 'viewer_count';
  HOST_AWAY: 'host_away';
}

export const SOCKET_EVENTS: SocketEvents = {
  JOIN_ROOM: 'join_room',
  LEAVE_ROOM: 'leave_room',
  SEND_MESSAGE: 'send_message',
  SEND_GIFT: 'send_gift',
  NEW_MESSAGE: 'new_message',
  NEW_GIFT: 'new_gift',
  VIEWER_JOINED: 'viewer_joined',
  VIEWER_LEFT: 'viewer_left',
  VIEWER_COUNT: 'viewer_count',
  HOST_AWAY: 'host_away',
};

export function joinLiveRoom(socket: any, roomId: string, userId: string): void {
  if (!socket) return;
  
  socket.emit(SOCKET_EVENTS.JOIN_ROOM, {
    roomId,
    userId,
    timestamp: Date.now(),
  });
}

export function leaveLiveRoom(socket: any, roomId: string, userId: string): void {
  if (!socket) return;
  
  socket.emit(SOCKET_EVENTS.LEAVE_ROOM, {
    roomId,
    userId,
    timestamp: Date.now(),
  });
}

export function sendChatMessage(
  socket: any,
  roomId: string,
  message: Message
): void {
  if (!socket) return;
  
  socket.emit(SOCKET_EVENTS.SEND_MESSAGE, {
    roomId,
    message,
    timestamp: Date.now(),
  });
}

export function sendGiftEvent(
  socket: any,
  roomId: string,
  gift: FloatingGift,
  combo: number
): void {
  if (!socket) return;
  
  socket.emit(SOCKET_EVENTS.SEND_GIFT, {
    roomId,
    gift,
    combo,
    timestamp: Date.now(),
  });
}
