# OAuth Social Login Setup Guide

This guide explains how to configure OAuth social login with Google, Microsoft, and Apple for your ChironEdge application.

## Environment Variables Required

Add these environment variables to your Replit Secrets or `.env` file:

### Required for all OAuth providers:
```
SESSION_SECRET=your-super-secret-session-key-change-in-production
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

### Google OAuth (Currently Implemented)
```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Microsoft OAuth (Ready to configure)
```
MICROSOFT_CLIENT_ID=your-microsoft-client-id
MICROSOFT_CLIENT_SECRET=your-microsoft-client-secret
```

### Apple OAuth (Ready to configure)
```
APPLE_CLIENT_ID=your-apple-client-id
APPLE_TEAM_ID=your-apple-team-id
APPLE_KEY_ID=your-apple-key-id
APPLE_PRIVATE_KEY=your-apple-private-key
```

## OAuth Provider Setup Instructions

### 1. Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure the OAuth consent screen
6. Set up the OAuth 2.0 Client ID:
   - Application type: Web application
   - Authorized JavaScript origins: `https://your-replit-domain.replit.app`
   - Authorized redirect URIs: `https://your-replit-domain.replit.app/auth/google/callback`

### 2. Microsoft OAuth Setup

1. Go to the [Azure Portal](https://portal.azure.com/)
2. Navigate to "Azure Active Directory" → "App registrations"
3. Click "New registration"
4. Set up your application:
   - Name: ChironEdge
   - Supported account types: Accounts in any organizational directory and personal Microsoft accounts
   - Redirect URI: `https://your-replit-domain.replit.app/auth/microsoft/callback`
5. Go to "Certificates & secrets" → "New client secret"
6. Note down the Application (client) ID and client secret value

### 3. Apple OAuth Setup

1. Go to the [Apple Developer Portal](https://developer.apple.com/)
2. Sign in with your Apple Developer account
3. Navigate to "Certificates, Identifiers & Profiles"
4. Create a new App ID
5. Enable "Sign In with Apple" capability
6. Create a Services ID for web authentication
7. Configure the Services ID:
   - Domains: `your-replit-domain.replit.app`
   - Return URLs: `https://your-replit-domain.replit.app/auth/apple/callback`
8. Create a private key for "Sign In with Apple"

## Redirect URLs to Configure

When setting up OAuth providers, use these redirect URLs:

- **Google**: `https://your-replit-domain.replit.app/auth/google/callback`
- **Microsoft**: `https://your-replit-domain.replit.app/auth/microsoft/callback`
- **Apple**: `https://your-replit-domain.replit.app/auth/apple/callback`

Replace `your-replit-domain.replit.app` with your actual Replit deployment URL.

## How It Works

1. User clicks a social login button (Google/Microsoft/Apple)
2. User is redirected to the OAuth provider's authentication page
3. After successful authentication, the provider redirects back to your app
4. Your backend creates or finds the user account using the email from the OAuth provider
5. A JWT token is generated and sent back to the frontend
6. The user is logged in and redirected to the homepage

## Security Features

- **Email-based user matching**: Users with the same email across different OAuth providers will be linked to the same account
- **JWT tokens**: Secure 7-day expiration tokens for session management
- **Empty password hash**: OAuth users have empty password fields (they can't use manual login)
- **Session management**: Express sessions handle the OAuth flow securely

## Testing

Currently, Google OAuth is fully implemented and ready to test. Microsoft and Apple OAuth are configured in the code but require you to set up the OAuth credentials with the respective providers.

To test Google OAuth:
1. Set up Google OAuth credentials as described above
2. Add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to your environment variables
3. Click the "Continue with Google" button on the login or registration page
4. Complete the Google authentication flow
5. You'll be redirected back and automatically logged in

## Need Help?

If you need assistance setting up OAuth credentials for any provider, I can guide you through the specific steps once you have access to the respective developer consoles.