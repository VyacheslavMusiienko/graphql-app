import { GraphQLSchema } from 'graphql';
import DocExplorer from './doc-explorer';
import ProviderDocumentation from './provider-documentation';

type CharacterSchemaProps = {
  schema: GraphQLSchema | undefined;
};

const CharacterSchema = ({ schema }: CharacterSchemaProps) => {
  return schema ? (
    <ProviderDocumentation
      schema={schema}
      dangerouslyAssumeSchemaIsValid={false}
      inputValueDeprecation={false}
    >
      <DocExplorer />
    </ProviderDocumentation>
  ) : null;
};

export default CharacterSchema;
