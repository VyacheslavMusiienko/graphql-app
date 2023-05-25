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

export type SchemaContextProviderProps = {
  children: ReactNode;
  // eslint-disable-next-line react/require-default-props
  dangerouslyAssumeSchemaIsValid?: boolean;
  // eslint-disable-next-line react/require-default-props
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

    // eslint-disable-next-line no-plusplus
    counterRef.current++;
  }, [props.schema]);

  const { introspectionQuery, introspectionQuerySansSubscriptions } =
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    useIntrospectionQuery({
      inputValueDeprecation: props.inputValueDeprecation,
    });

  const { dangerouslyAssumeSchemaIsValid, children } = props;
  const introspect = useCallback(() => {
    if (isSchema(props.schema) || props.schema === null) {
      return;
    }

    // eslint-disable-next-line no-plusplus
    const counter = ++counterRef.current;

    const maybeIntrospectionData = props.schema;

    // eslint-disable-next-line consistent-return
    async function fetchIntrospectionData() {
      if (maybeIntrospectionData) {
        return maybeIntrospectionData;
      }

      setIsFetching(true);
      setFetchError(null);

      setIsFetching(false);
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

export const useSchemaContext = createContextHook(SchemaContext);

type IntrospectionArgs = {
  // eslint-disable-next-line react/require-default-props
  inputValueDeprecation?: boolean;
};

function useIntrospectionQuery({ inputValueDeprecation }: IntrospectionArgs) {
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
}
