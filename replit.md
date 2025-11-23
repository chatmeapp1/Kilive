# Overview

This is a mobile live streaming application built with Expo and React Native. The app provides a TikTok-like live streaming experience where users can broadcast live video, watch other users' streams, and interact through real-time chat. The application includes features for user profiles, following creators, virtual gifts, and social engagement.

# Recent Changes

**November 23, 2025 - Secure Storage Implementation**
- Implemented platform-aware secure storage system for authentication tokens
- Created `utils/storage.ts` abstraction layer:
  - iOS/Android: Uses expo-secure-store for encrypted keychain storage
  - Web: Uses localStorage for browser persistence
  - Fallback: In-memory storage for error handling
- Updated `contexts/AuthContext.tsx` to use secure storage wrapper
- Installed expo-secure-store package with proper Expo config plugin
- Fixed AsyncStorage error by migrating to encrypted native storage
- Ensures auth tokens are properly encrypted on mobile devices while maintaining web compatibility

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Mobile-First Architecture

The application is built exclusively for mobile platforms (iOS and Android) using Expo framework. Web access is intentionally restricted with a placeholder page indicating "mobile-first application" status. This design decision ensures optimal performance and native features for mobile users.

**Key decisions:**
- Platform detection in root layout (`_layout.tsx`) redirects web users to a status page
- Native mobile features leveraged through Expo modules
- File-based routing via Expo Router for navigation

## Frontend Architecture

### Technology Stack
- **Framework**: React Native 0.81.4 with React 19.1.0
- **Navigation**: Expo Router v6 with file-based routing, React Navigation for tab navigation
- **UI Libraries**: Expo vector icons, custom themed components, SF Symbols (iOS) / Material Icons (Android)
- **Animations**: React Native Reanimated v4.1.0 for smooth animations
- **Styling**: StyleSheet API with themed color system supporting light/dark modes

### Component Architecture

**Theming System**: Centralized theming through `ThemedText` and `ThemedView` components that automatically adapt to system color scheme (light/dark mode). Color constants defined in `constants/Colors.ts` provide consistent brand colors across the app.

**UI Component Strategy**: 
- Reusable themed wrapper components for consistent styling
- Platform-specific icon components (`IconSymbol.ios.tsx` vs `IconSymbol.tsx`) for native appearance
- Modular live streaming components isolated in `components/live/` directory
- Custom haptic feedback integration for tab navigation

### Screen Structure

**Tab-based Navigation** (`app/(tabs)/`):
- **Home/Index**: Main feed with horizontal scrolling tabs (Follow, Hot, New) showing live stream thumbnails
- **Live**: Broadcaster setup screen with camera preview and title input
- **Profile**: User profile with stats, badges, and bio

**Modal/Stack Screens**:
- **Broadcast**: Active broadcasting interface with viewer count and chat
- **Live Viewer**: Stream watching interface with host info, chat, and interactive elements

**Rationale**: Tab navigation provides quick access to core features while stack navigation handles contextual screens like live streaming sessions.

## Live Streaming Features

### Real-time Video Integration

**Technology**: react-native-agora v4.5.3 for WebRTC-based video streaming

**Architecture decisions**:
- Agora SDK chosen for reliable, low-latency live streaming at scale
- Separation of broadcaster (`broadcast.tsx`) and viewer (`live-viewer.tsx`) interfaces
- Camera controls (flip, filters, mute) accessible during broadcast

### Interactive Components

**Chat System**: Custom `ChatMessageList` component (`components/live/ChatMessageList.tsx`) displays scrolling messages with user levels and usernames highlighted. Each message includes an optional level badge and supports flexible styling. Messages are passed as an array of `ChatMessage` objects with id, username, message, level, and avatar properties.

**Virtual Gifts**: Gift notifications show animated bubbles with user information and gift amounts. Gift animations positioned absolutely over video stream with semi-transparent backgrounds.

**System Messages**: `SystemMessage` component (`components/live/SystemMessage.tsx`) displays platform rules and announcements with semi-transparent dark overlay. Accepts message text as a prop for easy reusability across different contexts.

**Live Viewer UI Components**:
- **Header Bar**: Displays host information (avatar, name, ID), follow button, viewer list with avatars, and viewer count badge
- **Income Display**: Shows hourly earnings with coin icon and rank badge
- **Bottom Action Bar**: Comprehensive interaction panel with text input for chat, message icon, link/chain icon, co-host button, game controller, three-dots menu, and gift button

**Design rationale**: Component isolation in `components/live/` directory allows independent styling and state management while maintaining consistent positioning over video content. Each component is self-contained with its own styles and props interface for maximum reusability.

## State Management

Currently using React local state (useState, useEffect) for component-level state management. No global state library implemented.

**Considerations**: 
- Simple state needs met by local state
- Potential future need for global state (user session, stream status) if app scales
- Props drilling acceptable for current component depth

## Platform-Specific Implementations

### iOS-Specific Features
- SF Symbols via expo-symbols for native icon appearance
- BlurView for translucent tab bar (`TabBarBackground.ios.tsx`)
- Haptic feedback on tab presses (iOS only)

### Cross-Platform Fallbacks
- Material Icons fallback for Android/web (`IconSymbol.tsx`)
- Opaque tab bar for Android/web platforms
- Platform detection prevents unsupported features from loading

**Rationale**: Platform-specific implementations ensure native look-and-feel while maintaining code reusability through component abstraction.

## UI/UX Patterns

### Design System
- Gradient backgrounds (LinearGradient) for premium feel on key screens
- Semi-transparent overlays for video interface elements
- Circular avatar images with consistent sizing
- Badge system for user levels, achievements, and verification

### Gesture Handling
- React Native Gesture Handler for smooth scroll interactions
- Horizontal scroll view with snap-to-tab behavior on home screen
- Touch feedback on interactive elements

### Animation Strategy
- Reanimated for performant animations (parallax scrolling, transforms)
- Shared value animations for wave gesture on welcome screen
- Worklets (react-native-worklets 0.5.1) for UI thread animations

**Rationale**: Native performance crucial for smooth video playback; animations run on UI thread to avoid blocking video rendering.

# External Dependencies

## Video Streaming
- **Agora SDK** (react-native-agora v4.5.3): Real-time video communication platform for live streaming functionality
- Requires Agora account and API credentials for production use
- Handles video encoding, streaming, and WebRTC connections

## Expo Managed Services
- **expo-router**: File-based routing and navigation
- **expo-font**: Custom font loading (SpaceMono)
- **expo-splash-screen**: App launch screen management
- **expo-linking**: Deep linking capabilities
- **expo-web-browser**: In-app browser for external links
- **expo-haptics**: Tactile feedback on iOS
- **expo-blur**: Native blur effects (iOS)

## UI & Graphics
- **react-native-svg**: SVG rendering for custom icons and graphics
- **expo-linear-gradient** / **react-native-linear-gradient**: Gradient backgrounds
- **expo-image**: Optimized image component with caching
- **@react-native-community/slider**: Custom slider controls

## Navigation & Gestures
- **@react-navigation/native**: Core navigation library
- **@react-navigation/bottom-tabs**: Tab navigation
- **react-native-gesture-handler**: Advanced touch gestures
- **react-native-safe-area-context**: Safe area handling for notched devices
- **react-native-screens**: Native screen optimizations

## Development Tools
- **TypeScript**: Type safety with strict mode enabled
- **ESLint**: Code linting with Expo configuration
- **Jest**: Testing framework (configured but no tests written)

## Future Integration Considerations
- Backend API for user authentication, stream metadata, and chat persistence (not currently implemented)
- Database for user profiles, follow relationships, and stream history (no current integration)
- Payment/virtual currency system for gift purchases (react-native-agora supports this)
- Push notifications for follower activity (Expo supports this via expo-notifications)