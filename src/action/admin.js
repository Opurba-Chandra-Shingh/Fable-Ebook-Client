'use server'

import { serverDelete, serverMutation } from "@/server/server"

export const updateUserRole = async (id, role) => {
    return await serverMutation(`/api/users/${id}/role`, { role }, 'PATCH');
}

export const deleteUserAdmin = async (id) => {
    return await serverDelete(`/api/users/${id}`);
}
