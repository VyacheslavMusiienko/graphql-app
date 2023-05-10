import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { schemaFromExecutor } from '@graphql-tools/wrap';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { useEffect, useState } from 'react';

const CharacterSchema = () => {
  const [schema, setSchema] = useState<{
    schema: GraphQLSchema | null;
  }>({ schema: null });

  useEffect(() => {
    async function fetchSchema() {
      const uri = 'https://spacex-production.up.railway.app/';
      const remoteExecutor = buildHTTPExecutor({ endpoint: uri });
      const postsSubschema = {
        schema: await schemaFromExecutor(remoteExecutor),
      };
      setSchema(postsSubschema);
    }
    fetchSchema();
  }, []);

  if (!schema || !schema.schema) {
    return <div>Loading schema...</div>;
  }

  const queryType = schema.schema.getType('Query') as GraphQLObjectType;
  const queryFields = queryType.getFields();

  const mutationType = schema.schema.getType('Mutation') as GraphQLObjectType;
  const mutationFields = mutationType.getFields();

  const subscriptionsType = schema.schema.getType('Subscriptions') as GraphQLObjectType;
  const subscriptionsFields = subscriptionsType?.getFields();

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <h1>GraphQL Schema query</h1>
        <ul>
          {queryFields &&
            Object.keys(queryFields).map((fieldName) => <li key={fieldName}>{fieldName}</li>)}
        </ul>
      </div>
      <div>
        <h1>GraphQL Schema mutation</h1>
        <ul>
          {mutationFields &&
            Object.keys(mutationFields).map((fieldName) => <li key={fieldName}>{fieldName}</li>)}
        </ul>
      </div>
      <div>
        <h1>GraphQL Schema Subscriptions</h1>
        <ul>
          {subscriptionsFields &&
            Object.keys(subscriptionsFields).map((fieldName) => (
              <li key={fieldName}>{fieldName}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};
export default CharacterSchema;
