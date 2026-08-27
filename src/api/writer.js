'use server'

import { serverFetch } from "@/server/server"

export const getWriterById = async(writerId)=>{
    return await serverFetch(`/api/users/${writerId}`);
}