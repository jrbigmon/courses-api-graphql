import express from "express";
import { schema } from "./graphql/graphql.schema.js";
import { resolvers } from "./graphql/graphql.resolver.js";
import { graphqlHTTP } from "express-graphql";
import { db, dbInit } from "./db/connection.js";
import { categoryModel } from "./db/models/category.model.js";

const app = express();
const port = 3000;

await dbInit(db);

const {} = app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolvers({ categoryModel: categoryModel(db) }),
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
