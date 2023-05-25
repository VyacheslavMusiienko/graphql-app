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
  fetchError: string | null;
  introspect(): void;
  isFetching: boolean;
  schema: MaybeGraphQLSchema;
  validationErrors: readonly GraphQLError[];
};

export const SchemaContext = createNullableContext<SchemaContextType>('SchemaContext');

type IntrospectionArgs = {
  inputValueDeprecation?: boolean;
};

const useIntrospectionQuery = ({ inputValueDeprecation }: IntrospectionArgs) => {
  return useMemo(() => {
    const query = getIntrospectionQuery({
      inputValueDeprecation,
    });

    const querySansSubscriptions = query.replace('subscriptionType { name }', '');

    return {
      introspectionQuery: query,
      introspectionQuerySansSubscriptions: querySansSubscriptions,
    };
  }, [inputValueDeprecation]);
};

export type SchemaContextProviderProps = {
  children: ReactNode;
  dangerouslyAssumeSchemaIsValid?: boolean;
  schema?: GraphQLSchema | IntrospectionQuery | null;
} & IntrospectionArgs;

export const SchemaContextProvider = (props: SchemaContextProviderProps) => {
  const [schema, setSchema] = useState<MaybeGraphQLSchema>();
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const counterRef = useRef(0);

  useEffect(() => {
    setSchema(
      isSchema(props.schema) || props.schema === null || props.schema === undefined
        ? props.schema
        : undefined
    );

    counterRef.current += 1;
  }, [props.schema]);

  const { introspectionQuery, introspectionQuerySansSubscriptions } = useIntrospectionQuery({
    inputValueDeprecation: props.inputValueDeprecation,
  });

  const { dangerouslyAssumeSchemaIsValid, children } = props;
  const introspect = useCallback(() => {
    if (isSchema(props.schema) || props.schema === null) {
      return;
    }

    const counter = counterRef.current + 1;

    const maybeIntrospectionData = props.schema;

    async function fetchIntrospectionData() {
      if (maybeIntrospectionData) {
        return maybeIntrospectionData;
      }

      setIsFetching(true);
      setFetchError(null);

      setIsFetching(false);
      return null;
    }

    fetchIntrospectionData()
      .then((introspectionData) => {
        if (counter !== counterRef.current || !introspectionData) {
          return;
        }

        try {
          const newSchema = buildClientSchema(introspectionData);
          setSchema(newSchema);
        } catch (error: unknown) {
          if (error instanceof Error) {
            setFetchError(error.message);
          }
        }
      })
      .catch((error) => {
        if (counter !== counterRef.current) {
          return;
        }

        setFetchError(error.message);
        setIsFetching(false);
      });
  }, [introspectionQuery, introspectionQuerySansSubscriptions, props.schema]);
  useEffect(() => {
    introspect();
  }, [introspect]);

  useEffect(() => {
    function triggerIntrospection(event: KeyboardEvent) {
      if (event.ctrlKey && event.key === 'R') {
        introspect();
      }
    }

    window.addEventListener('keydown', triggerIntrospection);
    return () => window.removeEventListener('keydown', triggerIntrospection);
  });

  const validationErrors = useMemo(() => {
    if (!schema || dangerouslyAssumeSchemaIsValid) {
      return [];
    }
    return validateSchema(schema);
  }, [schema, dangerouslyAssumeSchemaIsValid]);

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

SchemaContextProvider.defaultProps = {
  dangerouslyAssumeSchemaIsValid: false,
  schema: null,
};

export const useSchemaContext = createContextHook(SchemaContext);
