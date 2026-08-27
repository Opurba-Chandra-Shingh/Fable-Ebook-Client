'use server'

import { serverFetch } from "@/server/server"

export const getAllBooks = async(req, res) =>{
    return await serverFetch('/api/books');
}

export const getBookByID = async(id) =>{
    return await serverFetch(`/api/books/${id}`)
}

export const getRelatedBooksByGenre = async(genre)=>{
    return await serverFetch(`/api/books?genre=${genre}`)
}