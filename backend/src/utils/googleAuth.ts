import crypto from 'crypto';

export class GoogleAuth {
    private static get config() {
        return {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            redirectUri: process.env.GOOGLE_REDIRECT_URI || process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5173/auth/google/callback'
        };
    }

    static getAuthUrl() {
        const { clientId, redirectUri } = this.config;
        const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
        const options = {
            redirect_uri: redirectUri!,
            client_id: clientId!,
            access_type: 'offline',
            response_type: 'code',
            prompt: 'consent',
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email',
            ].join(' '),
        };

        const qs = new URLSearchParams(options);
        return `${rootUrl}?${qs.toString()}`;
    }

    static async getTokens(code: string) {
        const { clientId, clientSecret, redirectUri } = this.config;
        const url = 'https://oauth2.googleapis.com/token';
        const values = {
            code,
            client_id: clientId!,
            client_secret: clientSecret!,
            redirect_uri: redirectUri!,
            grant_type: 'authorization_code',
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(values),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error_description || 'Failed to fetch Google tokens');
        }

        return response.json();
    }

    static async getUserInfo(id_token: string) {
        const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`);
        if (!response.ok) {
            throw new Error('Failed to verify Google token');
        }
        return response.json();
    }
}
