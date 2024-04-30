import { Request, Response } from "express";
import prisma from "../db";
import * as followService from "../services/follow";

export const follow = async (req: Request, res: Response) => {
   try {
      console.log(req.body);
      const { followingId } = req.body;
      const followerId = res.locals.user;

      const followResult = await followService.follow(followerId, followingId);

      res.json({
         success: true,
         message: followResult,
      });
   } catch (error) {
      console.log(error);

      res.status(500).json({
         success: false,
         error: error,
      });
   }
};

export const getFollowers = async (req: Request, res: Response) => {
   try {
      const { followingId } = req.params;

      const followers = await prisma.follow.findMany({
         where: {
            followingId: +followingId,
         },
         select: {
            follower: {
               select: {
                  id: true,
                  fullname: true,
                  username: true,
                  profile: {
                     select: {
                        avatar: true,
                     },
                  },
               },
            },
         },
      });

      res.json({
         success: true,
         message: "success",
         data: followers,
      });
   } catch (error) {
      const err = error as Error;
      console.log(err);
      res.status(500).json({
         success: false,
         error: error,
      });
   }
};

export const getFollowings = async (req: Request, res: Response) => {
   try {
      const { followerId } = req.params;

      const followings = await prisma.follow.findMany({
         where: {
            followerId: +followerId,
         },
         include: {
            following: {
               select: {
                  id: true,
                  fullname: true,
                  username: true,
                  profile: {
                     select: {
                        avatar: true,
                     },
                  },
               },
            },
         },
      });

      res.json({
         success: true,
         message: "success",
         data: followings,
      });
   } catch (error) {
      const err = error as Error;
      console.log(err);

      res.status(500).json({
         success: false,
         error: err.message,
      });
   }
};

export const getSuggestedUsers = async (req: Request, res: Response) => {
   try {
       // Dapatkan ID pengguna dari properti 'userId' objek 'Request'
       const userId = res.locals.user;

       // Dapatkan pengguna yang disarankan (belum diikuti) untuk pengguna yang sedang masuk
       const suggestedUsers = await followService.getSuggestedUsers(userId);

       // Kirim respons dengan daftar pengguna yang disarankan
       res.json({
           status: true,
           message: "success",
           data: suggestedUsers
       });
   } catch (error) {
       const err = error as unknown as Error;
       res.status(500).json({
           status: false,
           message: err.message
       });
   }
};

export const checkFollowStatus = async (req: Request, res: Response) => {
   try {
      const LoggedInId = res.locals.user;
      const { id_user } = req.params;

      const followings = await prisma.follow.findFirst({
         where: {
            followerId: LoggedInId,
            followingId: +id_user
         },
      });

      res.json({
         success: true,
         message: "success",
         data: followings ? true : false,
      });
   } catch (error) {
      const err = error as Error;
      console.log(err);

      res.status(500).json({
         success: false,
         error: err.message,
      });
   }
};

export const getFollowingUsers = async (req: Request, res: Response) => {
   try {
      const followerId = res.locals.user;
      const following = await followService.getFollowingUsers(followerId);
      res.json({
         success: true,
         message: "success",
         data: following,
      });
   } catch (error) {
      const err = error as Error;
      console.log(err);
      res.status(500).json({
         success: false,
         error: err.message,
      });
   }
}

export const getFollowerUsers = async (req: Request, res: Response) => {
   try {
       const followingId = res.locals.user;
       const follower = await followService.getFollowerUsers(followingId);
       res.json({
           success: true,
           message: "success",
           data: follower,
       });
   } catch (error) {
       const err = error as Error;
       console.log(err);
       res.status(500).json({
           success: false,
           error: err.message,
       });
   }
}
