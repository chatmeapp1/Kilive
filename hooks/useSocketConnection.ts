
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface UseSocketConnectionProps {
  roomId: string;
  userId: string;
  username: string;
}

export function useSocketConnection({ roomId, userId, username }: UseSocketConnectionProps) {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    connectSocket();

    return () => {
      disconnectSocket();
    };
  }, [roomId]);

  const connectSocket = () => {
    try {
      const SOCKET_URL = process.env.EXPO_PUBLIC_SOCKET_URL || 'http://localhost:5000';
      
      socketRef.current = io(SOCKET_URL, {
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      socketRef.current.on('connect', () => {
        console.log('Socket connected');
        setIsConnected(true);
        setError(null);

        // Join room
        socketRef.current?.emit('join_live', {
          roomId,
          userId,
          username,
        });
      });

      socketRef.current.on('disconnect', () => {
        console.log('Socket disconnected');
        setIsConnected(false);
      });

      socketRef.current.on('connect_error', (err) => {
        console.error('Socket connection error:', err);
        setError('Failed to connect to server');
      });

    } catch (err: any) {
      console.error('Socket init error:', err);
      setError(err.message);
    }
  };

  const disconnectSocket = () => {
    if (socketRef.current) {
      socketRef.current.emit('leave_live', { roomId, userId });
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  };

  const sendMessage = (message: string) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('send_message', {
        roomId,
        userId,
        username,
        message,
        timestamp: Date.now(),
      });
    }
  };

  const sendGift = (giftData: any) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('send_gift', {
        roomId,
        userId,
        username,
        ...giftData,
        timestamp: Date.now(),
      });
    }
  };

  return {
    socket: socketRef.current,
    isConnected,
    error,
    sendMessage,
    sendGift,
    disconnectSocket,
  };
}
