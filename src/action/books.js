'use server'

import { serverDelete, serverMutation } from "@/server/server"

export const postBook = async(data) =>{
    return await serverMutation('/api/books',data,'POST');
}

export const updateBook = async(id, data) =>{
    return await serverMutation(`/api/books/${id}`, data, 'PATCH');
}

export const deleteBook = async(id) =>{
    return await serverDelete(`/api/books/${id}`);
}
