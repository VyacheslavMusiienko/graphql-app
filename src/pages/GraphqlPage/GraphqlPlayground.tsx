import { GraphQLSchema, buildClientSchema } from 'graphql';
import { getIntrospectionQuery } from 'graphql/utilities';
import { useState } from 'react';

const CharacterSchema = () => {
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);

  const getSchema = async () => {
    const response = await fetch('https://spacex-production.up.railway.app/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: getIntrospectionQuery(),
      }),
    });

    const { data } = await response.json();
    const schemaRevest = buildClientSchema(data);
    setSchema(schemaRevest);
  };

  return (
    <div>
      <button type="button" onClick={getSchema}>
        Get Schema
      </button>
      {schema && (
        <pre>
          <code>{JSON.stringify(schema.toConfig(), null, 2)}</code>
        </pre>
      )}
    </div>
  );
};
export default CharacterSchema;
