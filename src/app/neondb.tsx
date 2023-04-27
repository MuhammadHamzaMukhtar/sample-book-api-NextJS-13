import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL, {
  ssl: require,
});

const query = (query: string) => {
  return sql.unsafe(query);
};

export default query;
