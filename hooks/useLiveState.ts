
import { useState, useCallback } from 'react';
import type { Message, Viewer, LiveState } from '@/types/live.types';

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

  const addMessage = useCallback((username: string, message: string, level: number = 1, vip?: number) => {
    const newMessage: Message = {
      id: Date.now().toString() + Math.random(),
      username,
      level,
      vip,
      message: message.trim()
    };
    setMessages(prev => [...prev, newMessage].slice(-50)); // Keep last 50 messages
  }, []);

  const addViewer = useCallback((viewer: Viewer) => {
    setViewers(prev => {
      const exists = prev.find(v => v.id === viewer.id);
      if (exists) return prev;
      return [...prev, viewer];
    });
    setViewerCount(prev => prev + 1);
  }, []);

  const removeViewer = useCallback((viewerId: string) => {
    setViewers(prev => prev.filter(v => v.id !== viewerId));
    setViewerCount(prev => Math.max(0, prev - 1));
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const reset = useCallback(() => {
    setMessages([]);
    setViewers([]);
    setViewerCount(0);
    setIsBroadcasting(false);
    setIsHostAway(false);
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
    clearMessages,
    reset,
  };
}
