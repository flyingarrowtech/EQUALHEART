import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import User from '../modules/user/user.schema';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'dummy',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy',
    callbackURL: "/api/v1/auth/google/callback"
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ 'socialAuth.id': profile.id, 'socialAuth.provider': 'Google' });

            if (!user) {
                // Check by email if they already registered with email
                user = await User.findOne({ email: profile.emails?.[0].value });

                if (user) {
                    // Link social account
                    if (!user.socialAuth) user.socialAuth = [];
                    user.socialAuth.push({ provider: 'Google', id: profile.id });
                    await user.save();
                } else {
                    // Create new user (highly simplified for now, as common fields might be missing)
                    user = await User.create({
                        email: profile.emails?.[0].value,
                        fullName: {
                            firstName: profile.name?.givenName,
                            lastName: profile.name?.familyName
                        },
                        socialAuth: [{ provider: 'Google', id: profile.id }],
                        isVerified: true // Socially verified
                    });
                }
            }
            return done(null, user);
        } catch (err) {
            return done(err as Error);
        }
    }
));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID || 'dummy',
    clientSecret: process.env.FACEBOOK_APP_SECRET || 'dummy',
    callbackURL: "/api/v1/auth/facebook/callback",
    profileFields: ['id', 'emails', 'name']
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ 'socialAuth.id': profile.id, 'socialAuth.provider': 'Facebook' });

            if (!user) {
                user = await User.findOne({ email: profile.emails?.[0].value });

                if (user) {
                    if (!user.socialAuth) user.socialAuth = [];
                    user.socialAuth.push({ provider: 'Facebook', id: profile.id });
                    await user.save();
                } else {
                    user = await User.create({
                        email: profile.emails?.[0].value,
                        fullName: {
                            firstName: profile.name?.givenName,
                            lastName: profile.name?.familyName
                        },
                        socialAuth: [{ provider: 'Facebook', id: profile.id }],
                        isVerified: true
                    });
                }
            }
            return done(null, user);
        } catch (err) {
            return done(err as Error);
        }
    }
));

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

export default passport;
