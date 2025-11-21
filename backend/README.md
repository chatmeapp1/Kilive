
# Kylive Backend API Documentation

## Authentication System

### Roles
- **Admin**: Full control of the system
- **Agency**: Manage hosts, view income and commissions
- **Host**: Stream live, earn diamonds, view own stats
- **User/Viewer**: Watch streams, send gifts, top up coins

### Endpoints

#### Auth Routes (`/api/auth`)
- `POST /register` - Register new user (role: user, host, agency)
- `POST /login` - Login and get tokens
- `POST /refresh-token` - Refresh access token
- `POST /logout` - Logout (requires auth)
- `GET /verify` - Verify token (requires auth)
- `GET /me` - Get current user profile (requires auth)

#### Admin Routes (`/api/admin`) - Admin only
- `GET /users` - Get all users
- `PATCH /users/:userId/status` - Suspend/activate user
- `POST /gifts` - Add new gift
- `GET /income` - View all platform income
- `GET /analytics` - Get platform analytics

#### Agency Routes (`/api/agency`) - Agency role
- `POST /create` - Create agency
- `GET /hosts` - Get hosts under agency
- `GET /income` - Get agency income and commission
- `POST /hosts` - Add host to agency
- `GET /hosts/:hostId/performance` - Get host performance

#### Live Routes (`/api/live`)
- `GET /active` - Get active live streams (public)
- `GET /:roomId` - Get live details (public)
- `POST /start` - Start live (host only)
- `POST /end` - End live (host only)
- `GET /hours/stats` - Get live hours stats (host only)
- `POST /:roomId/join` - Join live (authenticated)

#### User Routes (`/api/user`) - Requires auth
- `GET /profile/:userId` - Get user profile
- `PUT /profile` - Update profile
- `GET /level/:userId` - Get user level
- `GET /income/:userId` - Get income (host only, in diamonds)
- `GET /fans/:userId` - Get user fans
- `GET /coins` - Get user coins (viewer)

#### Gift Routes (`/api/gift`)
- `GET /` - Get all gifts
- `POST /send` - Send gift (requires auth)
- `GET /history` - Get gift history (requires auth)

### Token System
- **Access Token**: 15 minutes expiry
- **Refresh Token**: 7 days expiry
- Use refresh token to get new access token without re-login

### Headers
```
Authorization: Bearer <access_token>
```

### Income System
- **Hosts earn DIAMONDS** from gifts
- **Users spend COINS** to buy gifts
- **3 hours live = 1 day** counted for host stats
- **Agencies get commission** (typically 20%) from host income
