// import ApolloClient from 'apollo-client';
// import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
// import * as UserUtils from "../utils/user";

import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import moment from 'moment';

const BASE_URL = 'http://localhost:3000/graphql';

const cache = new InMemoryCache(); // new InMemoryCache().restore(initialState || {}),
// const link = new HttpLink({
//   uri: BASE_URL,
// });

const authLink = setContext((_, { headers }) => {
  // const token = UserUtils.getTokenFromLocalStorage();
  return {
    headers: {
      ...headers,
      // authorization: token
    },
  };
});

// const apolloClient = new ApolloClient({
//   cache,
//   link: authLink.concat(link),
// });

const apolloClient = new ApolloClient({
  request: (operation) => {
    operation.setContext({
      // fetchOptions: {
      //   credentials: 'include'
      // },
      // headers
      authLink, // instead of header
    });
  },
  uri: BASE_URL,
  cache: cache,
  // resolvers: {
  //   Blog: {
  //     daysOfExperience({ startDate, endDate }, args, { cache }) {
  //       let now = moment().unix();
  //       if (endDate) {
  //         now = endDate / 1000;
  //       }
  //       return moment.unix(now).diff(moment.unix(startDate / 1000), 'days');
  //     },
  //   },
  // },
});

export default apolloClient;
