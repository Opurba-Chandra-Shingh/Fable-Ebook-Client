import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db('fableEbook');

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        // Optional: if you don't provide a client, database transactions won't be enabled.
        client
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
                // The public sign-up endpoint would otherwise accept role: 'admin'
                // straight from the request body. Only 'reader'/'writer' may be
                // self-selected at sign-up; admins are promoted via the admin panel.
                before: async (user) => {
                    if (user.role !== 'writer') {
                        return { data: { ...user, role: 'reader' } };
                    }
                },
            },
        },
    },
});