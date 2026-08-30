'use server'

import { serverMutation } from "@/server/server"

export const updateProfile = async(data) =>{
    return await serverMutation('/api/users/me', data, 'PATCH');
}
