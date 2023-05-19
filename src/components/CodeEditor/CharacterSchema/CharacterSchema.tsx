import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { schemaFromExecutor } from '@graphql-tools/wrap';
import {
  GraphQLInputObjectType,
  GraphQLInputType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLOutputType,
  GraphQLScalarType,
  GraphQLSchema,
} from 'graphql';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../store';
import styles from './CharacterSchema.module.scss';

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

  function getArgType(type: GraphQLInputType) {
    if (type instanceof GraphQLNonNull) {
      const { ofType } = type;

      if (ofType instanceof GraphQLList) {
        return 'GraphQLList1';
      }
      return ofType.name;
    }

    if (type instanceof GraphQLInputObjectType) {
      const getFields = type.getFields();
      const fields = Object.entries(getFields).map(([fieldName, field]) => {
        const fieldType = field.type;

        if (fieldType instanceof GraphQLInputObjectType) {
          return 'GraphQLInputObjectType1';
        }

        return (
          <li key={fieldName} className={styles.arg_name_type}>
            <strong>{fieldName}:</strong> {fieldType.toString()}
          </li>
        );
      });

      return fields;
    }

    return (type as GraphQLScalarType).name;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function getTypes(type: GraphQLOutputType) {
    if (type instanceof GraphQLList) {
      return 'GraphQLList5';
    }
    if (type instanceof GraphQLObjectType) {
      const getFields = type.getFields();
      return (
        <ul className={styles.type_content}>
          <strong>{type.name}:</strong>
          {Object.entries(getFields).map(([fieldName, field]) => {
            const fieldType = field.type;
            if (fieldType instanceof GraphQLObjectType) {
              const fieldTypeGetFields = fieldType.getFields();
              const objectEntries = Object.entries(fieldTypeGetFields).map(
                ([fieldTypeName, fieldTypeField]) => {
                  if (fieldTypeField instanceof GraphQLObjectType) {
                    return 'GraphQLObjectType';
                  }
                  return (
                    <li key={`${type.name}-${fieldType.name}-${fieldTypeName}`}>
                      <strong>{fieldTypeName}:</strong>
                      {fieldTypeField.type.toString()}
                    </li>
                  );
                }
              );
              return (
                <li key={`${type.name}-${fieldName}`}>
                  <ul>{objectEntries}</ul>
                </li>
              );
            }
            return (
              <li key={fieldName}>
                <strong>{fieldName}:</strong> {(fieldType as GraphQLScalarType).name}
              </li>
            );
          })}
        </ul>
      );
    }
    return type.toString();
  }

  return (
    <div className={styles.character_schema}>
      {rootTypes.map((rootType) => (
        <div key={rootType.typeName}>
          <h2 className={styles.root_name}>{rootType.typeName}</h2>
          <ul>
            {Object.entries(rootType.type.getFields()).map(([fieldName, field]) => (
              <li key={fieldName}>
                <h3 className={styles.name_method}>{fieldName}</h3>
                <div className={styles.type_block}>
                  {/* <h2 className={styles.type_name}>Type:</h2> {getTypes(field.type)} */}
                </div>
                {field.args.length > 0 && (
                  <div className={styles.arg_block}>
                    <h2 className={styles.arg_name}>Arguments:</h2>
                    <ul className={styles.arg_content}>
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
