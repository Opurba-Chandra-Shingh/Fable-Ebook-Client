'use server'

import { serverFetch } from "@/server/server"

export const getMyPurchases = async () => {
    return await serverFetch('/api/purchases');
}

export const getWriterSales = async () => {
    return await serverFetch('/api/writer/sales');
}
