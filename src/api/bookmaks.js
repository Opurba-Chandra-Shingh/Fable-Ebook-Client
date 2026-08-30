'use server'

import { serverFetch } from "@/server/server"

// always the current user's own bookmarks — no id to pass, the backend knows from the session
export const getAllBookmarkedBooks = async()=>{
    return await serverFetch('/api/bookmarks');
}
