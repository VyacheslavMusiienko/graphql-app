import type { GraphQLSchema } from 'graphql';
import ExplorerSection from './section';
import TypeLink from './type-link';
import MarkdownContent from './utils/markdown';
import styles from './schema-documentation.module.scss';

type SchemaDocumentationProps = {
  schema: GraphQLSchema;
};

const SchemaDocumentation = (props: SchemaDocumentationProps) => {
  const queryType = props.schema.getQueryType();
  const mutationType = props.schema.getMutationType?.();
  const subscriptionType = props.schema.getSubscriptionType?.();
  const typeMap = props.schema.getTypeMap();
  const ignoreTypesInAllSchema = [queryType?.name, mutationType?.name, subscriptionType?.name];

  return (
    <>
      <MarkdownContent type="description">
        {props.schema.description ||
          'A GraphQL schema provides a root type for each kind of operation.'}
      </MarkdownContent>
      <ExplorerSection title="Root Types">
        {queryType ? (
          <div>
            <span className={styles.root_type}>query</span>
            {': '}
            <TypeLink type={queryType} />
          </div>
        ) : null}
        {mutationType && (
          <div>
            <span className={styles.root_type}>mutation</span>
            {': '}
            <TypeLink type={mutationType} />
          </div>
        )}
        {subscriptionType && (
          <div>
            <span className={styles.root_type}>subscription</span>
            {': '}
            <TypeLink type={subscriptionType} />
          </div>
        )}
      </ExplorerSection>
      <ExplorerSection title="All Schema Types">
        {typeMap && (
          <div>
            {Object.values(typeMap).map((type) => {
              if (ignoreTypesInAllSchema.includes(type.name) || type.name.startsWith('__')) {
                return null;
              }

              return (
                <div key={type.name}>
                  <TypeLink type={type} />
                </div>
              );
            })}
          </div>
        )}
      </ExplorerSection>
    </>
  );
};
export default SchemaDocumentation;
