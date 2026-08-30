'use server'

import { getUserSession } from "@/session/session";

const serverUrl = process.env.SERVER_SIDE_URL;

// Every call is stamped with the currently logged-in user's verified id, so
// the Express backend never has to trust an id coming from the browser.
// This request always originates on our own Next.js server, so the browser
// can never forge these headers.
async function authHeaders() {
    const user = await getUserSession();

    return {
        'content-type': 'application/json',
        'x-internal-secret': process.env.INTERNAL_API_SECRET,
        'x-user-id': user?.id || '',
    };
}

export const serverFetch = async (path) => {
    const res = await fetch(`${serverUrl}${path}`, {
        headers: await authHeaders(),
    });
    const data = await res.json();
    return data;
}


export const serverMutation = async (path, data, type) => {
    const res = await fetch(`${serverUrl}${path}`, {
        method: type,
        headers: await authHeaders(),
        body: JSON.stringify(data)
    })
    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || 'Something went wrong');
    }

    return result;
}

export const serverDelete = async (path) => {
    const res = await fetch(`${serverUrl}${path}`, {
        method: 'DELETE',
        headers: await authHeaders(),
    })
    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || 'Something went wrong');
    }

    return result;
}
