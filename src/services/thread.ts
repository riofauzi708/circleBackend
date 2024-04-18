import db from "../db";
import { IThread } from "../types/app";

export const getThreads = async () => {
    return await db.thread.findMany({
        where: {
            threadId: null
        },
        include: {
            image: {
                select: {
                    image: true
                }
            }
        }
    });
}

export const getThread = async (id: number) => {
    return await db.thread.findFirst({
        where: {
            id,
            threadId: null
        },
        include: {
            image: {
                select: {
                    image: true
                }
            }
        }
    })
}

export const createThread = async (
    payload: IThread,
    files: { [fieldname: string]: Express.Multer.File[] }
 ) => {
    const thread = await db.thread.create({
       data: {
          ...payload,
          threadId: payload.threadId ? +payload.threadId : null,
       },
    });
 
    if (files.image) {
       await db.threadImage.createMany({
          data: files.image.map((image) => ({
             image: image.filename,
             threadId: thread.id,
          })),
       });
    }
 
    return thread;
 };

export const deleteThread = async (idThread: number, userId: number) => {
    const existedThread = await db.thread.delete({
        where: {
            id : idThread
        }
    })
    
    if (!existedThread) { 
        throw new Error("thread not found")
    }

    if(existedThread.userId !== userId) {
        throw new Error("you are not allowed to delete this thread")
    }
    return await db.thread.delete({
        where: {
            id : idThread
        }
    })
}