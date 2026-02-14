import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { UserService } from './user.service';
import { BehaviorService } from './behavior.service';

export class UserController {
    static async getProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const userAuth = (req as any).user as { userId: string } | undefined;
            if (!userAuth?.userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

            const user = await UserService.getProfile(userAuth.userId);
            if (!user) return res.status(404).json({ success: false, message: 'User not found' });

            res.status(200).json({ success: true, data: user });
        } catch (error: any) {
            next(error);
        }
    }

    static async updateProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const user = (req as any).user as { userId: string } | undefined;
            if (!user?.userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

            console.log('Update Profile Request Body:', JSON.stringify(req.body, null, 2));

            const updatedProfile = await UserService.updateProfile(user.userId, req.body);
            res.status(200).json({
                success: true,
                message: 'Profile updated successfully',
                data: updatedProfile
            });
        } catch (error: any) {
            console.error('Update Profile Error Details:', {
                message: error.message,
                stack: error.stack,
                name: error.name,
                errors: error.errors // Mongoose validation errors
            });
            next(error);
        }
    }

    static async searchProfiles(req: Request, res: Response, next: NextFunction) {
        try {
            const userAuth = (req as any).user as { userId: string } | undefined;
            const currentUser = userAuth ? await UserService.getProfile(userAuth.userId) : null;

            const profiles = await UserService.searchProfiles(req.query, currentUser?.membership.tier);
            res.status(200).json({ success: true, data: profiles });
        } catch (error: any) {
            next(error);
        }
    }

    static async getPublicProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const targetId = req.params.id as string;
            const userAuth = (req as any).user as { userId: string } | undefined;

            const profile = await UserService.getProfile(targetId);
            if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });

            // Record visit if authenticated and not self
            if (userAuth?.userId && userAuth.userId !== targetId) {
                await UserService.recordVisit(targetId, userAuth.userId);
            }

            // Privacy check: if phone visibility is Restricted, hide it unless requested (or if premium)
            const profileData = profile.toObject() as any;
            if (profile.privacySettings.phoneVisibility === 'Request' || profile.privacySettings.phoneVisibility === 'OnlyMe') {
                delete profileData.mobileNumber;
                delete profileData.officePhoneNumber;
            }

            // Add additional status fields
            let isShortlisted = false;
            let isShortlistedBy = false; // Is the current user shortlisted by the target?

            if (userAuth?.userId) {
                const currentUser = await UserService.getProfile(userAuth.userId);
                if (currentUser && currentUser.shortlistedUsers) {
                    isShortlisted = currentUser.shortlistedUsers.includes(targetId as any);
                }
                if (profile.shortlistedUsers) {
                    isShortlistedBy = profile.shortlistedUsers.includes(userAuth.userId as any);
                }
            }

            res.status(200).json({
                success: true,
                data: {
                    ...profileData,
                    isShortlisted,
                    isShortlistedBy,
                    profileViews: profile.profileVisitors ? profile.profileVisitors.length : 0
                }
            });
        } catch (error: any) {
            next(error);
        }
    }

    static async getMatches(req: Request, res: Response, next: NextFunction) {
        try {
            const userAuth = (req as any).user as { userId: string } | undefined;
            if (!userAuth?.userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

            const user = await UserService.getProfile(userAuth.userId);
            if (!user) return res.status(404).json({ success: false, message: 'User not found' });

            const matches = await UserService.calculateMatches(user);
            res.status(200).json({ success: true, data: matches });
        } catch (error: any) {
            next(error);
        }
    }

    static async blockUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userAuth = (req as any).user as { userId: string } | undefined;
            if (!userAuth?.userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

            await UserService.blockUser(userAuth.userId, req.params.id as string);
            res.status(200).json({ success: true, message: 'User blocked' });
        } catch (error: any) {
            next(error);
        }
    }

    static async reportUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userAuth = (req as any).user as { userId: string } | undefined;
            if (!userAuth?.userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

            await UserService.reportUser(req.params.id as string, userAuth.userId);
            res.status(200).json({ success: true, message: 'User reported' });
        } catch (error: any) {
            next(error);
        }
    }

    static async toggleShortlist(req: Request, res: Response, next: NextFunction) {
        try {
            const userAuth = (req as any).user as { userId: string } | undefined;
            if (!userAuth?.userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

            const targetId = req.params.id as string;
            const currentUser = await UserService.getProfile(userAuth.userId);

            if (!currentUser) return res.status(404).json({ success: false, message: 'User not found' });

            const isShortlisted = currentUser.shortlistedUsers?.includes(targetId as any);

            if (isShortlisted) {
                await UserService.unshortlistUser(userAuth.userId, targetId);
                res.status(200).json({ success: true, message: 'Removed from shortlist', isShortlisted: false });
            } else {
                await UserService.shortlistUser(userAuth.userId, targetId);
                res.status(200).json({ success: true, message: 'Shortlisted successfully', isShortlisted: true });
            }
        } catch (error: any) {
            next(error);
        }
    }


    static async uploadPhotos(req: Request, res: Response, next: NextFunction) {
        try {
            const userAuth = (req as any).user as { userId: string } | undefined;
            if (!userAuth?.userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

            const processedPhotos = (req as any).processedPhotos || [];
            if (!processedPhotos.length) return res.status(400).json({ success: false, message: 'No photos uploaded' });

            const profile = await UserService.getProfile(userAuth.userId);
            if (!profile) return res.status(404).json({ success: false, message: 'User not found' });

            const newPhotos = processedPhotos.map((p: any) => ({
                url: p.url,
                isMain: profile.photos.length === 0,
                isVerified: false,
                metadata: {
                    thumbnailUrl: p.thumbnailUrl,
                    watermarkedUrl: p.watermarkedUrl
                }
            }));

            const updatedProfile = await UserService.addPhotos(userAuth.userId, newPhotos);

            res.status(200).json({
                success: true,
                message: 'Photos uploaded successfully',
                data: updatedProfile?.photos
            });
        } catch (error: any) {
            next(error);
        }
    }

    static async deletePhoto(req: Request, res: Response, next: NextFunction) {
        try {
            const userAuth = (req as any).user as { userId: string } | undefined;
            if (!userAuth?.userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

            const { photoId } = req.params as any;
            const updatedProfile = await UserService.deletePhoto(userAuth.userId, photoId);
            res.status(200).json({ success: true, message: 'Photo deleted', data: updatedProfile?.photos });
        } catch (error: any) {
            next(error);
        }
    }

    static async setMainPhoto(req: Request, res: Response, next: NextFunction) {
        try {
            const userAuth = (req as any).user as { userId: string } | undefined;
            if (!userAuth?.userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

            const { photoId } = req.params as any;
            const updatedProfile = await UserService.setMainPhoto(userAuth.userId, photoId);
            res.status(200).json({ success: true, message: 'Main photo updated', data: updatedProfile?.photos });
        } catch (error: any) {
            next(error);
        }
    }

    static async logBehavior(req: Request, res: Response, next: NextFunction) {
        try {
            const userAuth = (req as any).user as { userId: string } | undefined;
            if (!userAuth?.userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

            const { targetId, action } = req.body;
            await UserService.logBehavior(userAuth.userId, targetId, action);

            res.status(200).json({ success: true, message: 'Behavior logged' });
        } catch (error: any) {
            next(error);
        }
    }

    static async getIceBreakers(req: Request, res: Response, next: NextFunction) {
        try {
            const userAuth = (req as any).user as { userId: string } | undefined;
            if (!userAuth?.userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

            const user = await UserService.getProfile(userAuth.userId);
            const partner = await UserService.getProfile(req.params.id as string);

            if (!user || !partner) return res.status(404).json({ success: false, message: 'User not found' });

            const iceBreakers = BehaviorService.generateIceBreakers(user, partner);
            res.status(200).json({ success: true, data: iceBreakers });
        } catch (error: any) {
            next(error);
        }
    }

    static async verifyIdentity(req: Request, res: Response, next: NextFunction) {
        try {
            const userAuth = (req as any).user as { userId: string } | undefined;
            if (!userAuth?.userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

            const { idType } = req.body;
            const file = req.file;

            if (!file) return res.status(400).json({ success: false, message: 'ID Proof file is required' });

            const uploadDir = path.join(process.cwd(), 'uploads/ids');
            if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

            const ext = path.extname(file.originalname).toLowerCase();
            const filename = `id-${userAuth.userId}-${Date.now()}${ext}`;
            const filePath = path.join(uploadDir, filename);

            fs.writeFileSync(filePath, file.buffer);

            const idUrl = `/uploads/ids/${filename}`;

            const updatedUser = await UserService.verifyIdentity(userAuth.userId, idType || 'GovernmentID', idUrl);

            res.status(200).json({
                success: true,
                message: 'Identity document uploaded and verification pending',
                data: updatedUser?.governmentIdProof
            });
        } catch (error: any) {
            next(error);
        }
    }

    static async getVisitors(req: Request, res: Response, next: NextFunction) {
        try {
            const userAuth = (req as any).user as { userId: string } | undefined;
            if (!userAuth?.userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

            const user = await UserService.getProfile(userAuth.userId);
            if (user?.membership.tier === 'Basic') {
                return res.status(403).json({ success: false, message: 'Upgrade to premium to see who viewed your profile.' });
            }

            const visitors = await UserService.getProfileVisitors(userAuth.userId);
            res.status(200).json({ success: true, data: visitors });
        } catch (error: any) {
            next(error);
        }
    }

    static async getShortlisted(req: Request, res: Response, next: NextFunction) {
        try {
            const userAuth = (req as any).user as { userId: string } | undefined;
            if (!userAuth?.userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

            const shortlisted = await UserService.getShortlistedProfiles(userAuth.userId);
            res.status(200).json({ success: true, data: shortlisted });
        } catch (error: any) {
            next(error);
        }
    }

    static async getInterests(req: Request, res: Response, next: NextFunction) {
        try {
            const userAuth = (req as any).user as { userId: string } | undefined;
            if (!userAuth?.userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

            const type = req.query.type as 'sent' | 'received' | undefined;
            const interests = await UserService.getInterests(userAuth.userId, type || 'received');

            res.status(200).json({ success: true, data: interests });
        } catch (error: any) {
            next(error);
        }
    }

    static async acceptInterest(req: Request, res: Response, next: NextFunction) {
        try {
            const userAuth = (req as any).user as { userId: string } | undefined;
            if (!userAuth?.userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

            const interestId = req.params.id as string;
            await UserService.acceptInterest(userAuth.userId, interestId);

            res.status(200).json({
                success: true,
                message: 'Interest accepted successfully'
            });
        } catch (error: any) {
            next(error);
        }
    }

    static async rejectInterest(req: Request, res: Response, next: NextFunction) {
        try {
            const userAuth = (req as any).user as { userId: string } | undefined;
            if (!userAuth?.userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

            const interestId = req.params.id as string;
            await UserService.rejectInterest(userAuth.userId, interestId);

            res.status(200).json({
                success: true,
                message: 'Interest rejected successfully'
            });
        } catch (error: any) {
            next(error);
        }
    }

    static async unblockUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userAuth = (req as any).user as { userId: string } | undefined;
            if (!userAuth?.userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

            const targetId = req.params.id;
            await UserService.unblockUser(userAuth.userId, targetId as string);

            res.status(200).json({
                success: true,
                message: 'User unblocked successfully'
            });
        } catch (error: any) {
            next(error);
        }
    }

    static async upgradeMembership(req: Request, res: Response, next: NextFunction) {
        try {
            const userAuth = (req as any).user as { userId: string } | undefined;
            if (!userAuth?.userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

            const { tier, paymentMethod, transactionId } = req.body;
            const updatedUser = await UserService.upgradeMembership(userAuth.userId, tier, paymentMethod, transactionId);

            res.status(200).json({
                success: true,
                message: 'Membership upgraded successfully',
                data: updatedUser
            });
        } catch (error: any) {
            next(error);
        }
    }
}
