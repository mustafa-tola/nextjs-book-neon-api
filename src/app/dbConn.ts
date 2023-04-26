import postgres from "postgres";

const sql:postgres.Sql<{}> = postgres(process.env.DATABASE_URL as string, {ssl: require})

export default sql;