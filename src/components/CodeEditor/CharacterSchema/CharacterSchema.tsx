import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { schemaFromExecutor } from '@graphql-tools/wrap';
import {
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLInputType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLOutputType,
  GraphQLScalarType,
  GraphQLSchema,
} from 'graphql';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../store';

const CharacterSchema = () => {
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);
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
  const subscriptionsType = schema.getSubscriptionType();

  const rootTypes = [];

  if (queryType) {
    rootTypes.push({
      type: queryType,
      typeName: 'Query',
    });
  }

  if (mutationType) {
    rootTypes.push({
      type: mutationType,
      typeName: 'Mutation',
    });
  }

  if (subscriptionsType) {
    rootTypes.push({
      type: subscriptionsType,
      typeName: 'Subscription',
    });
  }

  function getArgType(type: GraphQLInputType | GraphQLOutputType) {
    if (type instanceof GraphQLList) {
      const { ofType } = type;
      if (ofType instanceof GraphQLNonNull) {
        if (ofType.ofType instanceof GraphQLInputObjectType) {
          return 'GraphQLInputObject';
        }
        if (ofType.ofType instanceof GraphQLEnumType) {
          return 'GraphQLEnumType';
        }
        return 'GraphQLList';
      }
      return null;
    }
    if (type instanceof GraphQLInputObjectType) {
      const { getFields } = type;
      const fields = Object.entries(getFields).map(([fieldName, field]) => {
        const fieldType = field.type.toString();
        return (
          <li key={fieldName}>
            <strong>{fieldName}:</strong> {fieldType}
          </li>
        );
      });
      return fields;
    }
    return (type as GraphQLScalarType).name;
  }

  function getTypes(type: GraphQLOutputType) {
    console.log(type);
    return type.toString();
  }

  return (
    <div>
      {rootTypes.map((rootType) => (
        <div key={rootType.typeName}>
          <h2>{rootType.typeName}</h2>
          <ul>
            {Object.entries(rootType.type.getFields()).map(([fieldName, field]) => (
              <li key={fieldName}>
                <h3>{fieldName}</h3>
                <div>
                  <strong>Type:</strong> {getTypes(field.type)}
                </div>
                {field.args.length > 0 && (
                  <div>
                    <strong>Arguments:</strong>
                    <ul>
                      {field.args.map((arg) => (
                        <li key={arg.name}>
                          <ul>
                            <strong>{arg.name}:</strong> {getArgType(arg.type)}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CharacterSchema;
