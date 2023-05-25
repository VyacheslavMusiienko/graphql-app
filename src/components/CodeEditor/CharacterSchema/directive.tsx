import { DirectiveNode } from 'graphql';
import styles from './directive.module.scss';

type DirectiveProps = {
  directive: DirectiveNode;
};

const Directive = ({ directive }: DirectiveProps) => {
  return <span className={styles.directive}>@{directive.name.value}</span>;
};
export default Directive;
