'use server'

import { serverMutation } from "@/server/server"

export const postBook = async(data) =>{
    return await serverMutation('/api/books',data,'POST');
}