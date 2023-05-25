import { ExplorerFieldDef, useExplorerContext } from './utils/context-explorer';

type FieldLinkProps = {
  field: ExplorerFieldDef;
};

const FieldLink = (props: FieldLinkProps) => {
  const { push } = useExplorerContext({ nonNull: true });

  return (
    <button
      type="button"
      className="graphiql-doc-explorer-field-name"
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
