import { isType } from 'graphql';
import { ReactNode } from 'react';
import Loader from '../../loader';
import FieldDocumentation from './field-documentation';
import SchemaDocumentation from './schema-documentation';
import TypeDocumentation from './type-documentation';
import { useSchemaContext } from './utils/schema';
import { useExplorerContext } from './utils/context-explorer';

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
    content = <div className="graphiql-doc-explorer-error">Error fetching schema</div>;
  } else if (validationErrors.length > 0) {
    content = (
      <div className="graphiql-doc-explorer-error">
        Schema is invalid: {validationErrors[0].message}
      </div>
    );
  } else if (isFetching) {
    content = <Loader active />;
  } else if (!schema) {
    content = <div className="graphiql-doc-explorer-error">No GraphQL schema available</div>;
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
    <section className="graphiql-doc-explorer" aria-label="Documentation Explorer">
      <div className="graphiql-doc-explorer-header">
        <div className="graphiql-doc-explorer-header-content">
          {prevName && (
            <button
              type="button"
              className="graphiql-doc-explorer-back"
              onClick={(event) => {
                event.preventDefault();
                pop();
              }}
              aria-label={`Go back to ${prevName}`}
            >
              {prevName}
            </button>
          )}
          <div className="graphiql-doc-explorer-title">{navItem.name}</div>
        </div>
      </div>
      <div className="graphiql-doc-explorer-content">{content}</div>
    </section>
  );
};
export default DocExplorer;
