'use server'

import { serverDelete, serverMutation } from "@/server/server"

export const addToBookmark = async(bookId) =>{
    return await serverMutation('/api/bookmarks', { bookId }, 'POST');
}

export const deleteBookmark = async(bookId) =>{
    return await serverDelete(`/api/bookmarks?bookId=${bookId}`);
}
