'use server'

import { serverFetch } from "@/server/server"

// Always returns the currently logged-in user's own bookmarks — the backend
// derives the user from the verified session, so no id needs to be passed.
export const getAllBookmarkedBooks = async()=>{
    return await serverFetch('/api/bookmarks');
}

export const getAllBookmarkedBooksWithQuery = async()=>{
    return await serverFetch('/api/bookmarks');
}
