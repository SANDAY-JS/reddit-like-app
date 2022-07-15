import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://ribeiraopreto.stepzen.net/api/wanton-emu/__graphql",
    headers: {
        Authorization: `APIKey ${process.env.NEXT_PUBLIC_STEPZEN_KEY}`
    },
    cache: new InMemoryCache(),
});

export default client;