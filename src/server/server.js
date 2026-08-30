'use server'

import { getUserSession } from "@/session/session";

const serverUrl = process.env.SERVER_SIDE_URL;

// stamps every request with the verified user id — the browser never sees this call, so it can't be forged
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
