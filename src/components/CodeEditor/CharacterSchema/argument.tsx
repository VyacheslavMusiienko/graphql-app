import { GraphQLArgument } from 'graphql';
import DefaultValue from './default-value';
import MarkdownContent from './utils/markdown';
import TypeLink from './type-link';

import styles from './argument.module.scss';

type ArgumentProps = {
  arg: GraphQLArgument;
  showDefaultValue?: boolean;
  inline?: boolean;
};

const Argument = ({ arg, showDefaultValue, inline }: ArgumentProps) => {
  const definition = (
    <span>
      <span className={styles.name}>{arg.name}</span>
      {': '}
      <TypeLink type={arg.type} />
      {showDefaultValue !== false && <DefaultValue field={arg} />}
    </span>
  );
  if (inline) {
    return definition;
  }
  return (
    <div className={styles.argument}>
      {definition}
      {arg.description ? (
        <MarkdownContent type="description">{arg.description}</MarkdownContent>
      ) : null}
      {arg.deprecationReason ? (
        <div className={styles.argument_deprecation}>
          <div className={styles.argument_deprecation_label}>Deprecated</div>
          <MarkdownContent type="deprecation">{arg.deprecationReason}</MarkdownContent>
        </div>
      ) : null}
    </div>
  );
};
export default Argument;
