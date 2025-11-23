
import type { BeautySettings } from '@/types/live.types';

export const AGORA_CONFIG = {
  appId: process.env.EXPO_PUBLIC_AGORA_APP_ID || '',
  channelPrefix: 'live_',
};

export function generateChannelName(hostId: string): string {
  return `${AGORA_CONFIG.channelPrefix}${hostId}`;
}

export function generateToken(channelName: string, uid: number): string {
  // TODO: Call backend to generate token
  return '';
}

export function applyBeautyEffect(
  agoraEngine: any,
  settings: BeautySettings
): void {
  if (!agoraEngine) return;

  try {
    agoraEngine.setBeautyEffectOptions(true, {
      lighteningLevel: settings.light,
      smoothnessLevel: settings.smooth,
      rednessLevel: settings.red,
      lighteningContrastLevel: 1,
    });
  } catch (error) {
    console.error('Failed to apply beauty effect:', error);
  }
}

export function enableCamera(agoraEngine: any, enabled: boolean): void {
  if (!agoraEngine) return;
  
  try {
    if (enabled) {
      agoraEngine.enableVideo();
    } else {
      agoraEngine.disableVideo();
    }
  } catch (error) {
    console.error('Failed to toggle camera:', error);
  }
}

export function switchCamera(agoraEngine: any): void {
  if (!agoraEngine) return;
  
  try {
    agoraEngine.switchCamera();
  } catch (error) {
    console.error('Failed to switch camera:', error);
  }
}

export function muteLocalAudio(agoraEngine: any, muted: boolean): void {
  if (!agoraEngine) return;
  
  try {
    agoraEngine.muteLocalAudioStream(muted);
  } catch (error) {
    console.error('Failed to mute audio:', error);
  }
}
