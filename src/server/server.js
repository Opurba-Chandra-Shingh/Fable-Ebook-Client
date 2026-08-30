'use server'


const serverUrl = process.env.SERVER_SIDE_URL;

export const serverFetch = async (path) => {
    const res = await fetch(`${serverUrl}${path}`);
    const data = await res.json();
    return data;
}


export const serverMutation = async (path, data, type) => {
    const res = await fetch(`${serverUrl}${path}`, {
        method: type,
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || 'Something went wrong');
    }

    return result;
}