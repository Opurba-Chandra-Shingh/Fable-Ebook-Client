import { authClient } from "@/lib/auth-client";

export const hndlSignOut = async (router) => {
    try {
        await authClient.signOut();
        router.refresh();
        router.push('/');
    } catch (error) {
        console.error('Sign out failed:', error);
    }
};