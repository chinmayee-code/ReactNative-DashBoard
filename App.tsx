import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {PublicRoutes} from '~/routes';
import PrivateRoutes from '~/routes/private';
import CustomTheme from '~/styles';
const httpLink = createHttpLink({
  uri: 'http://192.168.29.233:8000/graphql', // Replace with your GraphQL endpoint
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default function App(): JSX.Element {
  return (
    <ApolloProvider client={client}>
      <NativeBaseProvider
        theme={CustomTheme}
        config={{
          dependencies: {
            'linear-gradient': require('react-native-linear-gradient').default,
          },
        }}>
        <NavigationContainer>
          {true ? <PrivateRoutes /> : <PublicRoutes />}
        </NavigationContainer>
      </NativeBaseProvider>
    </ApolloProvider>
  );
}
