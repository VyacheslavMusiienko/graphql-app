import { GraphQLArgument } from 'graphql';
import { useState } from 'react';
import Argument from './argument';
import { ExplorerFieldDef } from './context';
import DeprecationReason from './deprecation-reason';
import MarkdownContent from './markdown';
import ExplorerSection from './section';
import TypeLink from './type-link';
import Directive from './directive';

type FieldDocumentationProps = {
  /**
   * The field or argument that should be rendered.
   */
  field: ExplorerFieldDef;
};

const Arguments = ({ field }: { field: ExplorerFieldDef }) => {
  const [showDeprecated, setShowDeprecated] = useState(false);

  if (!('args' in field)) {
    return null;
  }

  const args: GraphQLArgument[] = [];
  const deprecatedArgs: GraphQLArgument[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const argument of field.args) {
    if (argument.deprecationReason) {
      deprecatedArgs.push(argument);
    } else {
      args.push(argument);
    }
  }

  const tarnalOperation =
    // eslint-disable-next-line no-nested-ternary
    deprecatedArgs.length > 0 ? (
      showDeprecated || args.length === 0 ? (
        <ExplorerSection title="Deprecated Arguments">
          {deprecatedArgs.map((arg) => (
            <Argument key={arg.name} arg={arg} />
          ))}
        </ExplorerSection>
      ) : (
        <button
          type="button"
          onClick={() => {
            setShowDeprecated(true);
          }}
        >
          Show Deprecated Arguments
        </button>
      )
    ) : null;

  return (
    <>
      {args.length > 0 ? (
        <ExplorerSection title="Arguments">
          {args.map((arg) => (
            <Argument key={arg.name} arg={arg} />
          ))}
        </ExplorerSection>
      ) : null}
      {tarnalOperation}
    </>
  );
};

const Directives = ({ field }: { field: ExplorerFieldDef }) => {
  const directives = field.astNode?.directives || [];
  if (!directives || directives.length === 0) {
    return null;
  }
  return (
    <ExplorerSection title="Directives">
      {directives.map((directive) => (
        <div key={directive.name.value}>
          <Directive directive={directive} />
        </div>
      ))}
    </ExplorerSection>
  );
};

const FieldDocumentation = ({ field }: FieldDocumentationProps) => {
  return (
    <>
      {field.description ? (
        <MarkdownContent type="description">{field.description}</MarkdownContent>
      ) : null}
      <DeprecationReason>{field.deprecationReason}</DeprecationReason>
      <ExplorerSection title="Type">
        <TypeLink type={field.type} />
      </ExplorerSection>
      <Arguments field={field} />
      <Directives field={field} />
    </>
  );
};

export default FieldDocumentation;
