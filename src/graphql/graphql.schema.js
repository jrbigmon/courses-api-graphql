import { buildSchema } from "graphql";

export const schema = buildSchema(`
  type Category {
    id: ID!
    name: String!
    description: String!
    courses: [Course!]!
  }

  type Course {
    id: ID!
    name: String!
    description: String!
    category: Category!
  }

  input NewCategory {
    name: String!
    description: String!
  }

  input NewCourse {
    name: String!
    description: String!
    categoryId: ID!
  }

  type Query {
    categories: [Category!]!
    courses: [Course!]!
  }

  type Mutation {
    createCategory(input: NewCategory!): Category!
    createCourse(input: NewCourse!): Course!
  }
`);
