import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String
    lastName: String
    fullName: String!
  }

  type Tweet {
    id: ID!
    text: String!
    author: User
  }

  type Query {
    allUsers: [User!]!
    allTweets(id: ID): [Tweet!]!
    tweet(id: ID!): Tweet
  }

  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID): Boolean
  }
`;

let users = [
  {
    id: "3",
    firstName: "nico",
    lastName: "las",
    fullName: "nicolas",
  },
  {
    id: "4",
    firstName: "An",
    lastName: "changwan",
    fullName: "Anchangwan",
  },
];

let tweets = [
  {
    id: "1",
    text: "first one!",
    userId: "1",
  },
  {
    id: "2",
    text: "second one!",
    userId: "2",
  },
];

const resolvers = {
  Query: {
    allTweets() {
      return tweets;
    },
    tweet(root, { id }) {
      return tweets.find((tweet) => tweet.id === id);
    },
    allUsers() {
      console.log("allUsers called!");
      return users;
    },
  },
  Mutation: {
    postTweet(_, { text, userId }) {
      const userFind = users.find((user) => user.Id === userId);
      if (!userFind) {
        throw new Error(`userId(${userId}) is not find`);
      }
      const newTweet = {
        id: tweets.length + 1,
        text,
      };
      tweets.push(newTweet);
      return newTweet;
    },
    deleteTweet(_, { id }) {
      const tweet = tweets.find((tweet) => tweet.id === id);
      if (!tweet) return false;
      tweets = tweets.filter((tweet) => tweet.id !== id);
      return true;
    },
  },
  User: {
    fullName({ firstName, lastName }) {
      return `${firstName} ${lastName}`;
    },
  },
  Tweet: {
    author({ userId }) {
      return users.find((user) => user.id === userId);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
