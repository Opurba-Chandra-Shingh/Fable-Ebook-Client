import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db('fableEbook');

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client // needed for transactions
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },
    user: {
        additionalFields: {
            role: {
                type: 'string',
                required: false,
                defaultValue: 'reader',
            },
            bio: {
                type: 'string',
                required: false,
                defaultValue: '',
            },
        },
    },
    databaseHooks: {
        user: {
            create: {
                // block self-signup as admin — that only happens via the admin panel
                before: async (user) => {
                    if (user.role !== 'writer') {
                        return { data: { ...user, role: 'reader' } };
                    }
                },
            },
        },
    },
});