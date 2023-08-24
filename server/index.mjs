import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone"
import data from './mockData.mjs';

const typeDefs = `#graphql
interface Node {
  id: ID!
}

type Itinerary implements Node {
  id: ID!
  text: String
}

type Request implements Node {
  id: ID!
  text: String
}

type Query {
  node(id: ID!): Node
  itinerary(id: ID!): Itinerary
  request(id: ID!): Request
}
`

const resolvers = {
  Query: {
      node: (_, { id }) => {
          const decodedArr = decodeBase64(id);
          const type = decodedArr[0];
          const decodedId = decodedArr[1];

          return {...data[type][decodedId], _typeName: type};
        },
      itinerary: (_, { id }) => {
          console.log('fetching from itinerary');
          console.log('ID?', id)
          const decodedArr = decodeBase64(id);
          console.log('decodedArr?', decodedArr);
          const localID = decodedArr[1];
          const localData = data.Itinerary[localID];

          return {
            ...localData,
            id: id
          }
      },
      request: (_, { id }) => {
          const decodeArr = decodeBase64(id);
          const localID = decodeArr[i];
          const localData = data.Request[localID];
          return {
            ...localData,
            id: id
          }
      }
  },
  Node: {
      __resolveType: (obj) => {
          if (obj._typeName) {
              return obj._typeName;
          }
          return null;
      }
  }
};

const decodeBase64 = function (id) {
  const decode = (str) => Buffer.from(str, 'base64').toString('utf-8');
  const decoded = decode(id);
  const decodedArr = decoded.split(':');
  return decodedArr;
};

const server = new ApolloServer({
  typeDefs,
  resolvers
})

const { url } = await startStandaloneServer(server, {
  listen: {port: 4000}
})

console.log(`Server is running at: ${url}`);