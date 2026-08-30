'use server'

import { serverMutation } from "@/server/server"

export const createCheckoutSession = async (bookId) => {
    return await serverMutation('/api/purchases/create-checkout-session', { bookId }, 'POST');
}
