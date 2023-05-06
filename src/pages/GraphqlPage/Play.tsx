import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { schemaFromExecutor } from '@graphql-tools/wrap';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { useEffect, useState } from 'react';

const Play = () => {
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
  const fields = queryType.getFields();

  return (
    <div>
      <h1>GraphQL Schema</h1>
      <ul>
        {Object.keys(fields).map((fieldName) => (
          <li key={fieldName}>{fieldName}</li>
        ))}
      </ul>
    </div>
  );
};
export default Play;
