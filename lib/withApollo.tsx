

import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import moment from 'moment';

const BASE_URL = 'https://nestjsgraphql.herokuapp.com/graphql';

export default withApollo(
  ({ initialState, headers }) => {
    return new ApolloClient({
      request: operation => {
        operation.setContext({
          // fetchOptions: {
          //   credentials: 'include'
          // },
          headers
        })
      },
      uri: BASE_URL,
      cache: new InMemoryCache().restore(initialState || {}),
      resolvers: {
        Portfolio: {
          daysOfExperience({startDate, endDate}, args, {cache}) {
            let now = moment().unix();
            if (endDate) {
              now = endDate / 1000;
            }
            return moment.unix(now).diff(moment.unix(startDate / 1000), 'days');
          }
        }
      }
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    }
  }
);
