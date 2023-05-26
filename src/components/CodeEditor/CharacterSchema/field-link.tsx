import { ExplorerFieldDef, useExplorerContext } from './utils/context-explorer';
import styles from './field-link.module.scss';

type FieldLinkProps = {
  field: ExplorerFieldDef;
};

const FieldLink = (props: FieldLinkProps) => {
  const { push } = useExplorerContext({ nonNull: true });

  return (
    <button
      type="button"
      className={styles.name}
      onClick={(event) => {
        event.preventDefault();
        push({ name: props.field.name, def: props.field });
      }}
    >
      {props.field.name}
    </button>
  );
};
export default FieldLink;
