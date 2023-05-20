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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function fieldTypeFunc(type: GraphQLInputType) {
    if (type instanceof GraphQLInputObjectType) {
      const typeGetFields = type.getFields();

      return (
        <li>
          <strong>{type.name}:</strong>
          <ul className={styles.arg_content} key={type.name} />
          {Object.entries(typeGetFields).map(([typeName, field]) => {
            const { type: type2 } = field;
            return (
              <li>
                <strong>{typeName}:</strong>
                {type2.toString()}
              </li>
            );
          })}
        </li>
      );
    }

    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function getArgType(type: GraphQLInputType) {
    if (type instanceof GraphQLNonNull) {
      const { ofType } = type;

      if (ofType instanceof GraphQLList) {
        if (ofType.ofType instanceof GraphQLNonNull) {
          const { ofType: ofType2 } = ofType.ofType;

          if (ofType2 instanceof GraphQLScalarType) {
            return ofType2.name;
          }
        }

        return 'GraphQLList1';
      }

      return ofType.name;
    }

    if (type instanceof GraphQLInputObjectType) {
      const getFields = type.getFields();
      const fields = Object.entries(getFields).map(([fieldName, field]) => {
        const fieldType = field.type;

        return (
          <ul key={fieldName} className={styles.arg_content}>
            <li>
              <strong>{fieldName}:</strong> {fieldType.toString()}
              <ul className={styles.arg_name_type}>{fieldTypeFunc(fieldType)}</ul>
            </li>
          </ul>
        );
      });

      return fields;
    }

    return null;
  }

  function type4Function(fieldName4: string, type4: GraphQLOutputType) {
    if (type4 instanceof GraphQLObjectType) {
      const getFields = type4.getFields();
      return (
        <li key={fieldName4}>
          <strong>{fieldName4}:</strong>
          {type4.toString()}
          <ul className={styles.arg_content}>
            {Object.entries(getFields).map(([fieldName5, field5]) => {
              const { type: type6 } = field5;
              if (type6 instanceof GraphQLNonNull) {
                const { ofType: ofType7 } = type6;
                if (ofType7 instanceof GraphQLList) {
                  const ofType8 = ofType7.ofType;
                  if (ofType8 instanceof GraphQLObjectType) {
                    const getOfType8Fields = ofType8.getFields();
                    return (
                      <li key={`${fieldName4}1-${fieldName5}`}>
                        <strong>{ofType8.name}:</strong>
                        {ofType8.toString()}
                        <ul className={styles.arg_content}>
                          {Object.entries(getOfType8Fields).map(([fieldName9, field9]) => {
                            console.log(field9);
                            return (
                              <li key={`${fieldName4}1-${fieldName5}-${fieldName9}`}>
                                <strong>{fieldName9}:23</strong>
                                {field9.type.toString()}
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    );
                  }
                }
              }

              return (
                <li key={fieldName5}>
                  <strong>{fieldName5}:</strong>
                  {type6.toString()}
                </li>
              );
            })}
          </ul>
        </li>
      );
    }

    if (type4 instanceof GraphQLNonNull) {
      return 'GraphQLNonNull5';
    }

    if (type4 instanceof GraphQLScalarType) {
      return (
        <li key={fieldName4}>
          <strong>{fieldName4}:</strong>
          {type4.toString()}
        </li>
      );
    }
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function getTypes(type: GraphQLOutputType) {
    if (type instanceof GraphQLObjectType) {
      const getFields = type.getFields();

      return (
        <ul className={styles.type_content} key="1">
          <strong>{type.name}:1</strong>
          {type.toString()}
          <ul className={styles.arg_content} key={`${type.name}1`}>
            {Object.entries(getFields).map(([fieldName1, field1]) => {
              const fieldType = field1.type;

              if (fieldType instanceof GraphQLObjectType) {
                const getFields1 = fieldType.getFields();

                return (
                  <li key={`${type.name}1-${fieldName1}`}>
                    <strong>{fieldName1}:</strong>
                    {field1.type.toString()}
                    <ul className={styles.arg_content} key={`${type.name}2-${fieldName1}`}>
                      {Object.entries(getFields1).map(([fieldName2, field2]) => {
                        if (field2.type instanceof GraphQLNonNull) {
                          const { ofType: ofType3 } = field2.type;

                          if (ofType3 instanceof GraphQLList) {
                            const { ofType: ofType4 } = ofType3;

                            if (ofType4 instanceof GraphQLObjectType) {
                              const getFields4 = ofType4.getFields();
                              return (
                                <li key={`${type.name}2-${fieldName1}-${ofType4.name}`}>
                                  <strong>{ofType4.name}:</strong>
                                  {ofType4.toString()}
                                  <ul
                                    className={styles.arg_content}
                                    key={`${type.name}1-${fieldName1}-${ofType4.name}`}
                                  >
                                    {Object.entries(getFields4).map(([fieldName4, field4]) => {
                                      const { type: type4 } = field4;

                                      return type4Function(fieldName4, type4);
                                    })}
                                  </ul>
                                </li>
                              );
                            }
                            return null;
                          }

                          return null;
                        }

                        return (
                          <li key={`${type.name}1-${fieldName1}-${fieldName2}`}>
                            <strong>{fieldName2}:</strong>
                            {field2.type.toString()}
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              }

              if (fieldType instanceof GraphQLScalarType) {
                return 'GraphQLScalarType1';
              }

              if (fieldType instanceof GraphQLNonNull) {
                const ofType1 = fieldType.ofType;

                if (ofType1 instanceof GraphQLScalarType) {
                  return 'GraphQLScalarType2';
                }

                if (ofType1 instanceof GraphQLObjectType) {
                  return 'GraphQLObjectType2';
                }

                if (ofType1 instanceof GraphQLList) {
                  return 'GraphQLList2';
                }
              }

              return null;
            })}
          </ul>
        </ul>
      );
    }

    if (type instanceof GraphQLList) {
      return 'GraphQLList';
    }

    if (type instanceof GraphQLNonNull) {
      return 'GraphQLNonNull ';
    }

    return null;
  }
  return (
    <div className={styles.character_schema}>
      {rootTypes.map((rootType) => (
        <div key={rootType.typeName}>
          <h2 className={styles.root_name}>{rootType.typeName}</h2>
          <ul key={rootType.typeName}>
            {Object.entries(rootType.type.getFields()).map(([fieldName, field]) => {
              return (
                <li key={fieldName}>
                  <h3 className={styles.name_method}>{fieldName}</h3>
                  <div className={styles.type_block}>
                    <h2 className={styles.type_name}>Type:</h2> {getTypes(field.type)}
                  </div>
                  {/* <div className={styles.arg_block}>
                    <h2 className={styles.arg_name}>Arguments:</h2>
                    <ul className={styles.arg_content}>
                      {field.args.map((arg) => {
                        return (
                          <li key={arg.name}>
                            <ul>
                              <li>
                                <strong>{arg.name}:</strong> {arg.type.toString()}
                                {getArgType(arg.type)}
                              </li>
                            </ul>
                          </li>
                        );
                      })}
                    </ul>
                  </div> */}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CharacterSchema;
