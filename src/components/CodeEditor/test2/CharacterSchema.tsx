import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { schemaFromExecutor } from '@graphql-tools/wrap';
import { GraphQLSchema } from 'graphql';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../store';
import TypeLink from './type-link';

const CharacterSchema = () => {
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);
  // const [content, setContent] = useState<React.ReactNode | null>(null);
  const { schemaURI: urI } = useAppSelector((state) => state.EditorReducer);

  useEffect(() => {
    async function fetchSchema() {
      const remoteExecutor = buildHTTPExecutor({ endpoint: urI });
      const schemaVal = await schemaFromExecutor(remoteExecutor);
      setSchema(schemaVal);
    }
    fetchSchema();
  }, []);

  if (!schema) {
    return <div>Loading schema...</div>;
  }

  const queryType = schema.getQueryType();
  const mutationType = schema.getMutationType();
  const subscriptionType = schema.getSubscriptionType();
  // const typeMap = schema.getTypeMap();

  const rootTypes = [];

  if (queryType) {
    rootTypes.push(queryType);
  }

  if (mutationType) {
    rootTypes.push(mutationType);
  }

  if (subscriptionType) {
    rootTypes.push(subscriptionType);
  }
  return (
    <div>
      {queryType ? (
        <div>
          <span className="graphiql-doc-explorer-root-type">query</span>
          <TypeLink type={queryType} />
        </div>
      ) : null}
      {mutationType && (
        <div>
          <span className="graphiql-doc-explorer-root-type">mutation</span>
          {': '}
          <TypeLink type={mutationType} />
        </div>
      )}
      {subscriptionType && (
        <div>
          <span className="graphiql-doc-explorer-root-type">subscription</span>
          {': '}
          <TypeLink type={subscriptionType} />
        </div>
      )}
    </div>
  );
};

export default CharacterSchema;
