import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

const DATABASE_SCHEMA: string = process.env.DATABASE_SCHEMA!;
const DATABASE_HOST: string = process.env.DATABASE_HOST!;
const DATABASE_PORT: number = parseInt(process.env.DATABASE_PORT!);
const DATABASE_USERNAME: string = process.env.DATABASE_USERNAME!;
const DATABASE_PASSWORD: string = process.env.DATABASE_PASSWORD!;

if (
  !DATABASE_SCHEMA ||
  !DATABASE_HOST ||
  !DATABASE_PORT ||
  !DATABASE_USERNAME ||
  !DATABASE_PASSWORD
) {
  throw new Error("Database credential missing in .env");
}

const connection = await mysql.createConnection({
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  user: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_SCHEMA,
});

export const db = drizzle(connection);
