import "dotenv/config";
export const PORT = process.env.PORT || 3000;
export const DB_TYPE = process.env.DB_TYPE || "postgres";
export const DB_PORT = parseInt(process.env.DB_PORT || "5432");
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_USERNAME = process.env.DB_USERNAME || "postgres";
export const DB_PASSWORD = process.env.DB_PASSWORD || "root";
export const DB_DATABASE = process.env.DB_DATABASE || "linkedin_scrap";