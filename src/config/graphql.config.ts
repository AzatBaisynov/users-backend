import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLISODateTime } from '@nestjs/graphql';

const graphqlConfig: ApolloDriverConfig = {
	driver: ApolloDriver,
	autoSchemaFile: 'schema.gql',
	sortSchema: true,
	playground: true,
	context: ({req}) => ({ headers: req.headers }),
	resolvers: { DateTime: GraphQLISODateTime }
}

export default graphqlConfig