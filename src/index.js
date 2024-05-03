import express from "express";
import { schema } from "./graphql/graphql.schema.js";
import { resolvers } from "./graphql/graphql.resolver.js";
import { graphqlHTTP } from "express-graphql";

const app = express();
const port = 3000;

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
