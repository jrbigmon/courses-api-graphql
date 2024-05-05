# Course API

## About

This project is a simple course and course category API. 
Its purpose is basically to understand the communication between client and server with graphql.

## Libraries
Some basic libraries were used for this project, such as:
- graphql
- express
- apollo server
- cors
- body-parser
- nodemon (development)
- sqlite3 (development)

## Usage

### Clone
```bash
git clone https://github.com/jrbigmon/courses-api-graphql.git
```

### Install all dependencies
```bash
yarn install
```

### Start server
Development mode
```bash
yarn start:dev
```

Production mode
```bash
yarn start
```

## Routes

### Apollo panel
```
http://localhost:3000/graphql?
```

### Category

Mutation
```graphql
mutation CreateCategory($input: NewCategory!) {
  createCategory(input: $input) {
    id
  }
}

# variabels
{
  "input": {
    "name": "Tecnology",
    "description": "Specialization"
  }
}
```

Query
```graphql
query GetCategories {
  categories {
    id
    name,
    description
  }
}
```

### Courses

Mutation
```graphql
mutation CreateCourse($input: NewCourse!) {
  createCourse(input: $input) {
    id
  }
}

# variabels
{
  "input": {
    "name": "JS",
    "description": "Course about the Javascript programming language",
    "categoryId": "<category_id>"
  }
}
```

Query
```graphql
query GetCourses {
  courses {
    id
    name
    description
    category {
      id
      name
      description
    }
  }
}
```

## Interfaces

```graphql
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
  categoryId: String!
  category: Category
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
```

