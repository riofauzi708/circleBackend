import db from "../db";

export const getLikes = async (threadId: number) => {
  return await db.like.findMany({
    where: {
      threadId,
    },
    include: {
      user: {
        select: {
          username: true,
          fullname: true,
          id: true,
        },
        include: {
          profile: {
            select: {
              avatar: true,
            },
          },
        },
      },
    },
  });
};

export const getCurrentLike = async (threadId: number, userId: number) => {
  return await db.like.findFirst({
    where: {
      threadId,
      userId,
    },
  });
}

export const createLike = async (payload: {
  threadId: number;
  userId: number;
}) => {
  const existedThread = await db.thread.findFirst({
    where: {
      id: payload.threadId,
    },
  });

  if (!existedThread) {
    throw new Error("Thread not found");
  }

  const existedLike = await db.like.findFirst({
    where: {
      threadId: payload.threadId,
      userId: payload.userId,
    },
  });

  if (existedLike) {
    await db.like.deleteMany({
      where: {
        threadId: payload.threadId,
        userId: payload.userId,
      },
    });
    return null; // Return null to indicate that the like was deleted
  }

  return await db.like.create({
    data: {
      ...payload,
    },
  });
};
