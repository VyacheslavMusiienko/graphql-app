import {
  GraphQLError,
  GraphQLSchema,
  IntrospectionQuery,
  buildClientSchema,
  getIntrospectionQuery,
  isSchema,
  validateSchema,
} from 'graphql';
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createContextHook, createNullableContext } from './context';

type MaybeGraphQLSchema = GraphQLSchema | null | undefined;

export type SchemaContextType = {
  /**
   * Stores an error raised during introspecting or building the GraphQL schema
   * from the introspection result.
   */
  fetchError: string | null;
  /**
   * Trigger building the GraphQL schema. This might trigger an introspection
   * request if no schema is passed via props and if using a schema is not
   * explicitly disabled by passing `null` as value for the `schema` prop. If
   * there is a schema (either fetched using introspection or passed via props)
   * it will be validated, unless this is explicitly skipped using the
   * `dangerouslyAssumeSchemaIsValid` prop.
   */
  introspect(): void;
  /**
   * If there currently is an introspection request in-flight.
   */
  isFetching: boolean;
  /**
   * The current GraphQL schema.
   */
  schema: MaybeGraphQLSchema;
  /**
   * A list of errors from validating the current GraphQL schema. The schema is
   * valid if and only if this list is empty.
   */
  validationErrors: readonly GraphQLError[];
};

export const SchemaContext = createNullableContext<SchemaContextType>('SchemaContext');

export type SchemaContextProviderProps = {
  children: ReactNode;
  /**
   * This prop can be used to skip validating the GraphQL schema. This applies
   * to both schemas fetched via introspection and schemas explicitly passed
   * via the `schema` prop.
   *
   * IMPORTANT NOTE: Without validating the schema, GraphiQL and its components
   * are vulnerable to numerous exploits and might break. Only use this prop if
   * you have full control over the schema passed to GraphiQL.
   *
   * @default false
   */
  // eslint-disable-next-line react/require-default-props
  dangerouslyAssumeSchemaIsValid?: boolean;
  /**
   * Invoked after a new GraphQL schema was built. This includes both fetching
   * the schema via introspection and passing the schema using the `schema`
   * prop.
   * @param schema The GraphQL schema that is now used for GraphiQL.
   */
  // eslint-disable-next-line react/require-default-props
  onSchemaChange?(schema: GraphQLSchema): void;
  /**
   * Explicitly provide the GraphiQL schema that shall be used for GraphiQL.
   * If this props is...
   * - ...passed and the value is a GraphQL schema, it will be validated and
   *   then used for GraphiQL if it is valid.
   * - ...passed and the value is the result of an introspection query, a
   *   GraphQL schema will be built from this introspection data, it will be
   *   validated, and then used for GraphiQL if it is valid.
   * - ...set to `null`, no introspection request will be triggered and
   *   GraphiQL will run without a schema.
   * - ...set to `undefined` or not set at all, an introspection request will
   *   be triggered. If this request succeeds, a GraphQL schema will be built
   *   from the returned introspection data, it will be validated, and then
   *   used for GraphiQL if it is valid. If this request fails, GraphiQL will
   *   run without a schema.
   */
  // eslint-disable-next-line react/require-default-props
  schema?: GraphQLSchema | IntrospectionQuery | null;
} & IntrospectionArgs;

export const SchemaContextProvider = (props: SchemaContextProviderProps) => {
  const [schema, setSchema] = useState<MaybeGraphQLSchema>();
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  /**
   * A counter that is incremented each time introspection is triggered or the
   * schema state is updated.
   */
  const counterRef = useRef(0);

  /**
   * Synchronize prop changes with state
   */
  useEffect(() => {
    setSchema(
      isSchema(props.schema) || props.schema === null || props.schema === undefined
        ? props.schema
        : undefined
    );

    /**
     * Increment the counter so that in-flight introspection requests don't
     * override this change.
     */
    // eslint-disable-next-line no-plusplus
    counterRef.current++;
  }, [props.schema]);

  /**
   * Get introspection query for settings given via props
   */
  const { introspectionQuery, introspectionQueryName, introspectionQuerySansSubscriptions } =
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    useIntrospectionQuery({
      inputValueDeprecation: props.inputValueDeprecation,
      introspectionQueryName: props.introspectionQueryName,
      schemaDescription: props.schemaDescription,
    });

  /**
   * Fetch the schema
   */
  const { onSchemaChange, dangerouslyAssumeSchemaIsValid, children } = props;
  const introspect = useCallback(() => {
    /**
     * Only introspect if there is no schema provided via props. If the
     * prop is passed an introspection result, we do continue but skip the
     * introspection request.
     */
    if (isSchema(props.schema) || props.schema === null) {
      return;
    }

    // eslint-disable-next-line no-plusplus
    const counter = ++counterRef.current;

    const maybeIntrospectionData = props.schema;

    // eslint-disable-next-line consistent-return
    async function fetchIntrospectionData() {
      if (maybeIntrospectionData) {
        // No need to introspect if we already have the data
        return maybeIntrospectionData;
      }

      setIsFetching(true);
      setFetchError(null);

      setIsFetching(false);
    }

    fetchIntrospectionData()
      .then((introspectionData) => {
        /**
         * Don't continue if another introspection request has been started in
         * the meantime or if there is no introspection data.
         */
        if (counter !== counterRef.current || !introspectionData) {
          return;
        }

        try {
          const newSchema = buildClientSchema(introspectionData);
          setSchema(newSchema);
          onSchemaChange?.(newSchema);
        } catch (error: unknown) {
          if (error instanceof Error) {
            setFetchError(error.message);
          }
        }
      })
      .catch((error) => {
        /**
         * Don't continue if another introspection request has been started in
         * the meantime.
         */
        if (counter !== counterRef.current) {
          return;
        }

        setFetchError(error.message);
        setIsFetching(false);
      });
  }, [
    introspectionQueryName,
    introspectionQuery,
    introspectionQuerySansSubscriptions,
    onSchemaChange,
    props.schema,
  ]);

  /**
   * Trigger introspection automatically
   */
  useEffect(() => {
    introspect();
  }, [introspect]);

  /**
   * Trigger introspection manually via short key
   */
  useEffect(() => {
    function triggerIntrospection(event: KeyboardEvent) {
      if (event.ctrlKey && event.key === 'R') {
        introspect();
      }
    }

    window.addEventListener('keydown', triggerIntrospection);
    return () => window.removeEventListener('keydown', triggerIntrospection);
  });

  /**
   * Derive validation errors from the schema
   */
  const validationErrors = useMemo(() => {
    if (!schema || dangerouslyAssumeSchemaIsValid) {
      return [];
    }
    return validateSchema(schema);
  }, [schema, dangerouslyAssumeSchemaIsValid]);

  /**
   * Memoize context value
   */
  const value = useMemo(
    () => ({
      fetchError,
      introspect,
      isFetching,
      schema,
      validationErrors,
    }),
    [fetchError, introspect, isFetching, schema, validationErrors]
  );

  return <SchemaContext.Provider value={value}>{children}</SchemaContext.Provider>;
};

export const useSchemaContext = createContextHook(SchemaContext);

type IntrospectionArgs = {
  /**
   * Can be used to set the equally named option for introspecting a GraphQL
   * server.
   * @default false
   * @see {@link https://github.com/graphql/graphql-js/blob/main/src/utilities/getIntrospectionQuery.ts|Utility for creating the introspection query}
   */
  // eslint-disable-next-line react/require-default-props
  inputValueDeprecation?: boolean;
  /**
   * Can be used to set a custom operation name for the introspection query.
   */
  // eslint-disable-next-line react/require-default-props
  introspectionQueryName?: string;
  /**
   * Can be used to set the equally named option for introspecting a GraphQL
   * server.
   * @default false
   * @see {@link https://github.com/graphql/graphql-js/blob/main/src/utilities/getIntrospectionQuery.ts|Utility for creating the introspection query}
   */
  // eslint-disable-next-line react/require-default-props
  schemaDescription?: boolean;
};

function useIntrospectionQuery({
  inputValueDeprecation,
  introspectionQueryName,
  schemaDescription,
}: IntrospectionArgs) {
  return useMemo(() => {
    const queryName = introspectionQueryName || 'IntrospectionQuery';

    let query = getIntrospectionQuery({
      inputValueDeprecation,
      schemaDescription,
    });
    if (introspectionQueryName) {
      query = query.replace('query IntrospectionQuery', `query ${queryName}`);
    }

    const querySansSubscriptions = query.replace('subscriptionType { name }', '');

    return {
      introspectionQueryName: queryName,
      introspectionQuery: query,
      introspectionQuerySansSubscriptions: querySansSubscriptions,
    };
  }, [inputValueDeprecation, introspectionQueryName, schemaDescription]);
}
