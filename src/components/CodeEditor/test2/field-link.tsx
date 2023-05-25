import { ExplorerFieldDef } from './context';

type FieldLinkProps = {
  /**
   * The field or argument that should be linked to.
   */
  field: ExplorerFieldDef;
};

const FieldLink = ({ field }: FieldLinkProps) => {
  return (
    <button
      type="button"
      className="graphiql-doc-explorer-field-name"
      onClick={(event) => {
        event.preventDefault();
      }}
    >
      {field.name}
    </button>
  );
};

export default FieldLink;
