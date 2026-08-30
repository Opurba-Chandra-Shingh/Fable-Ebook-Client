'use server'

import { serverMutation } from "@/server/server"

export const addToBookmark = async(data) =>{
    return await serverMutation('/api/bookmarks', data, 'POST');
}