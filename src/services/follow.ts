import db from "../db";
import { IUser } from "../types/app";

export const follow = async (followerId: number, followingId: number) => {
   const existingFollow = await db.follow.findFirst({
      where: {
         followerId,
         followingId,
      },
   });

   if (existingFollow) {
      await db.follow.deleteMany({
         where: {
            followerId,
            followingId,
         },
      });

      return "unfollowing successful";
   }

   const follow = await db.follow.create({
      data: {
         followerId,
         followingId,
      },
   });

   return "following successful";
};


export const getSuggestedUsers = async (userId: number) => {
   try {

       const users = await db.user.findMany({
           where: {
               NOT: {
                   id: userId 
               }
           },
           include: {
               profile: true
           }
       });


       const followedUserIds = (await db.follow.findMany({
           where: {
               followerId: userId
           },
           select: {
               followingId: true
           }
       })).map((follow) => follow.followingId);


       const suggestedUsers = users.filter((user) => !followedUserIds.includes(user.id));


       const randomSuggestedUsers = getRandomUsers(suggestedUsers, 5);

       return randomSuggestedUsers;
   } catch (error) {
       console.error("Error in getSuggestedUsers:", error);
       throw new Error("Failed to fetch suggested users.");
   }
};



// Fungsi untuk memilih pengguna secara acak dari array pengguna
const getRandomUsers = (users: IUser[], count: number): IUser[] => {
   const randomUsers: IUser[] = [];
   const totalUsers = users.length;
   const indexes = [];

   // Membuat array indeks dari 0 hingga totalUsers - 1
   for (let i = 0; i < totalUsers; i++) {
       indexes.push(i);
   }

   // Memilih count indeks secara acak dari array indeks
   for (let i = 0; i < count; i++) {
       const randomIndex = Math.floor(Math.random() * indexes.length);
       const selectedIndex = indexes.splice(randomIndex, 1)[0];
       randomUsers.push(users[selectedIndex]);
   }

   return randomUsers;
};


export const getFollowingUsers = async (userId: number) => {
   try {
       const followingUsers = await db.follow.findMany({
           where: {
               followerId: userId
           },
           include: {
               following: {
                   include: {
                       profile: {
                           select: {
                               avatar: true
                           }
                       }
                   }
               }
           }
       });
       return followingUsers.map((follow) => follow.following);
   } catch (error) {
       console.error("Error in getFollowingUsers:", error);
       throw new Error("Failed to fetch following users.");
   }    
};

export const getFollowerUsers = async (userId: number) => {
   try {
       const followerUsers = await db.follow.findMany({
           where: {
               followingId: userId
           },
           include: {
               follower: {
                   include: {
                       profile: {
                           select: {
                               avatar: true
                           }
                       }
                   }
               }
           }
       });
       return followerUsers.map((follow) => follow.follower);
   } catch (error) {
       console.error("Error in getFollowingUsers:", error);
       throw new Error("Failed to fetch following users.");
   }    
};

