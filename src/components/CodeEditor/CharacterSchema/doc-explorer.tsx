import { isType } from 'graphql';
import { ReactNode } from 'react';
import Loader from '../../loader';
import styles from './doc-explorer.module.scss';
import FieldDocumentation from './field-documentation';
import SchemaDocumentation from './schema-documentation';
import TypeDocumentation from './type-documentation';
import { useExplorerContext } from './utils/context-explorer';
import { useSchemaContext } from './utils/schema';

const DocExplorer = () => {
  const { fetchError, isFetching, schema, validationErrors } = useSchemaContext({
    nonNull: true,
    caller: DocExplorer,
  });
  const { explorerNavStack, pop } = useExplorerContext({
    nonNull: true,
    caller: DocExplorer,
  });

  const navItem = explorerNavStack.at(-1)!;

  let content: ReactNode = null;
  if (fetchError) {
    content = <div className={styles.error}>Error fetching schema</div>;
  } else if (validationErrors.length > 0) {
    content = <div className={styles.error}>Schema is invalid: {validationErrors[0].message}</div>;
  } else if (isFetching) {
    content = <Loader active />;
  } else if (!schema) {
    content = <div className={styles.error}>No GraphQL schema available</div>;
  } else if (explorerNavStack.length === 1) {
    content = <SchemaDocumentation schema={schema} />;
  } else if (isType(navItem.def)) {
    content = <TypeDocumentation type={navItem.def} />;
  } else if (navItem.def) {
    content = <FieldDocumentation field={navItem.def} />;
  }

  let prevName;
  if (explorerNavStack.length > 1) {
    prevName = explorerNavStack.at(-2)!.name;
  }

  return (
    <section className={styles.explorer} aria-label="Documentation Explorer">
      <div className={styles.header}>
        <div className={styles.header_content}>
          {prevName && (
            <button
              type="button"
              className={styles.back}
              onClick={(event) => {
                event.preventDefault();
                pop();
              }}
              aria-label={`Go back to ${prevName}`}
            >
              &#129044; {prevName}
            </button>
          )}
          <div className={styles.title}>{navItem.name}</div>
        </div>
      </div>
      <div className={styles.content}>{content}</div>
    </section>
  );
};
export default DocExplorer;
