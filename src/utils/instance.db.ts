// src/db.ts
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

const sql = neon("postgresql://neondb_owner:npg_pkPfK9b7mxYg@ep-mute-forest-aep0h8yy-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require");
export const db = drizzle(sql);
