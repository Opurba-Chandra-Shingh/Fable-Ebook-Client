'use server'

import { serverFetch } from "@/server/server"

export const getAllUsersAdmin = async () => {
    return await serverFetch('/api/users');
}

export const getAdminAnalytics = async () => {
    return await serverFetch('/api/admin/analytics');
}

export const getAdminTransactions = async () => {
    return await serverFetch('/api/admin/transactions');
}
