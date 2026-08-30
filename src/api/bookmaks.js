'use server'

import { serverFetch } from "@/server/server"

export const getAllBookmarkedBooks = async()=>{
    return await serverFetch('/api/bookmarks');
}