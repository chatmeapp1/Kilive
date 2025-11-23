
import { useState, useCallback } from 'react';

interface Message {
  id: string;
  username: string;
  level: number;
  message: string;
}

interface Viewer {
  id: string;
  avatar: string;
  username: string;
}

export function useLiveState() {
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [cameraType, setCameraType] = useState<'front' | 'back'>('front');
  const [beautyEnabled, setBeautyEnabled] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isHostAway, setIsHostAway] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [viewers, setViewers] = useState<Viewer[]>([]);
  const [viewerCount, setViewerCount] = useState(0);

  const toggleFlash = useCallback(() => {
    setFlashEnabled(prev => !prev);
  }, []);

  const toggleCamera = useCallback(() => {
    setCameraType(prev => prev === 'front' ? 'back' : 'front');
  }, []);

  const toggleBeauty = useCallback(() => {
    setBeautyEnabled(prev => !prev);
  }, []);

  const toggleMic = useCallback(() => {
    setIsMicMuted(prev => !prev);
  }, []);

  const addMessage = useCallback((username: string, message: string, level: number = 1) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      username,
      level,
      message: message.trim()
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  const addViewer = useCallback((viewer: Viewer) => {
    setViewers(prev => [...prev, viewer]);
    setViewerCount(prev => prev + 1);
  }, []);

  const removeViewer = useCallback((viewerId: string) => {
    setViewers(prev => prev.filter(v => v.id !== viewerId));
    setViewerCount(prev => Math.max(0, prev - 1));
  }, []);

  return {
    // States
    isBroadcasting,
    flashEnabled,
    cameraType,
    beautyEnabled,
    isMicMuted,
    isHostAway,
    messages,
    viewers,
    viewerCount,
    
    // Setters
    setIsBroadcasting,
    setIsHostAway,
    setViewerCount,
    
    // Actions
    toggleFlash,
    toggleCamera,
    toggleBeauty,
    toggleMic,
    addMessage,
    addViewer,
    removeViewer,
  };
}
