
import { Platform } from 'react-native';

class AgoraService {
  private static instance: AgoraService;
  private engine: any = null;
  private appId: string = '';

  private constructor() {}

  static getInstance(): AgoraService {
    if (!AgoraService.instance) {
      AgoraService.instance = new AgoraService();
    }
    return AgoraService.instance;
  }

  async initialize(appId: string) {
    try {
      this.appId = appId;
      
      if (Platform.OS === 'web') {
        console.log('Agora not supported on web');
        return null;
      }

      // Lazy load Agora RTC SDK
      const { default: RtcEngine } = await import('react-native-agora');
      
      if (!RtcEngine || typeof RtcEngine.createAgoraRtcEngine !== 'function') {
        throw new Error('Agora RTC Engine not available');
      }

      this.engine = RtcEngine.createAgoraRtcEngine();
      
      if (this.engine) {
        this.engine.initialize({
          appId: this.appId,
        });
        
        console.log('Agora initialized successfully');
      }
      
      return this.engine;
    } catch (error) {
      console.error('Agora initialization error:', error);
      return null;
    }
  }

  getEngine() {
    return this.engine;
  }

  async joinChannel(token: string, channelName: string, uid: number) {
    if (!this.engine) {
      throw new Error('Agora engine not initialized');
    }

    try {
      await this.engine.joinChannel(token, channelName, uid, {
        clientRoleType: 1, // Broadcaster
      });
    } catch (error) {
      console.error('Join channel error:', error);
      throw error;
    }
  }

  async leaveChannel() {
    if (this.engine) {
      await this.engine.leaveChannel();
    }
  }

  destroy() {
    if (this.engine) {
      this.engine.release();
      this.engine = null;
    }
  }
}

export default AgoraService.getInstance();
