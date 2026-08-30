'use server'

import { serverFetch } from "@/server/server"

export const getAllBooks = async(req, res) =>{
    return await serverFetch('/api/books');
}

export const getBookByID = async(id) =>{
    return await serverFetch(`/api/books/${id}`)
}

export const getBookContent = async(id) =>{
    return await serverFetch(`/api/books/${id}/content`)
}

export const getRelatedBooksByGenre = async(genre)=>{
    return await serverFetch(`/api/books?genre=${genre}`)
}

export const searchBooks = async(searchParams) => {
    const params = new URLSearchParams();

    if (searchParams.search) params.set('search', searchParams.search);
    if (searchParams.genre) params.set('genre', searchParams.genre);
    if (searchParams.minPrice) params.set('minPrice', searchParams.minPrice);
    if (searchParams.maxPrice) params.set('maxPrice', searchParams.maxPrice);
    if (searchParams.availability) params.set('availability', searchParams.availability);
    if (searchParams.sort) params.set('sort', searchParams.sort);
    params.set('page', searchParams.page || '1');
    params.set('limit', searchParams.limit || '12');

    return await serverFetch(`/api/books?${params.toString()}`);
}
