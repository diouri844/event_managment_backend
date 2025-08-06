// drizzle.config.ts
import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';
export default defineConfig({
    schema: './src/db/schema.ts', // adjust to your actual schema path
    out: '../drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL || ""
    }
});