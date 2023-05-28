import { ExplorerContextProvider, ExplorerContextProviderProps } from './utils/context-explorer';
import { SchemaContextProvider, SchemaContextProviderProps } from './utils/schema';

type ProviderProps = ExplorerContextProviderProps & SchemaContextProviderProps;

const ProviderDocumentation = ({
  children,
  dangerouslyAssumeSchemaIsValid,
  inputValueDeprecation,
  schema,
}: ProviderProps) => {
  return (
    <SchemaContextProvider
      dangerouslyAssumeSchemaIsValid={dangerouslyAssumeSchemaIsValid}
      inputValueDeprecation={inputValueDeprecation}
      schema={schema}
    >
      <ExplorerContextProvider>{children}</ExplorerContextProvider>
    </SchemaContextProvider>
  );
};

export default ProviderDocumentation;
