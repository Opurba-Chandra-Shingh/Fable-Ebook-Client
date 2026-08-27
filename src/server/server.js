'use server'


const serverUrl = process.env.SERVER_SIDE_URL;

export const serverFetch = async(path) =>{
    const res = await fetch(`${serverUrl}${path}`);
    const data = await res.json();
    return data;
}