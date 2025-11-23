
import { useRef, useEffect, useState } from 'react';
import { Platform } from 'react-native';

interface UseAgoraEngineProps {
  channelName: string;
  uid: number;
  isHost: boolean;
}

export function useAgoraEngine({ channelName, uid, isHost }: UseAgoraEngineProps) {
  const agoraEngineRef = useRef<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeAgora();

    return () => {
      cleanup();
    };
  }, []);

  const initializeAgora = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Dynamic import based on platform
      if (Platform.OS === 'web') {
        console.warn('Agora not supported on web');
        setIsLoading(false);
        return;
      }

      const RtcEngine = require('react-native-agora').default;
      
      // Initialize engine
      agoraEngineRef.current = await RtcEngine.createWithContext({
        appId: process.env.EXPO_PUBLIC_AGORA_APP_ID || '',
        channelProfile: 1, // Live Broadcasting
      });

      // Enable video
      await agoraEngineRef.current.enableVideo();
      
      // Set client role
      await agoraEngineRef.current.setClientRole(isHost ? 1 : 2); // 1 = Broadcaster, 2 = Audience

      // Join channel
      await agoraEngineRef.current.joinChannel(
        null, // token
        channelName,
        null,
        uid
      );

      setIsInitialized(true);
      setIsLoading(false);
    } catch (err: any) {
      console.error('AGORA INIT ERROR:', err);
      setError(err.message || 'Failed to initialize Agora');
      setIsLoading(false);
    }
  };

  const cleanup = async () => {
    try {
      if (agoraEngineRef.current) {
        await agoraEngineRef.current.leaveChannel();
        await agoraEngineRef.current.destroy();
        agoraEngineRef.current = null;
      }
    } catch (err) {
      console.error('Error cleaning up Agora:', err);
    }
  };

  const switchCamera = async () => {
    try {
      await agoraEngineRef.current?.switchCamera();
    } catch (err) {
      console.error('Error switching camera:', err);
    }
  };

  const muteLocalAudio = async (muted: boolean) => {
    try {
      await agoraEngineRef.current?.muteLocalAudioStream(muted);
    } catch (err) {
      console.error('Error muting audio:', err);
    }
  };

  const enableLocalVideo = async (enabled: boolean) => {
    try {
      if (enabled) {
        await agoraEngineRef.current?.enableVideo();
      } else {
        await agoraEngineRef.current?.disableVideo();
      }
    } catch (err) {
      console.error('Error toggling video:', err);
    }
  };

  return {
    agoraEngine: agoraEngineRef.current,
    isInitialized,
    isLoading,
    error,
    switchCamera,
    muteLocalAudio,
    enableLocalVideo,
    cleanup,
  };
}
