import { GraphQLNamedType, GraphQLType, isType } from 'graphql';
import { ReactNode, useState } from 'react';
// eslint-disable-next-line import/no-cycle
import { ExplorerFieldDef } from './context';
// eslint-disable-next-line import/no-cycle
import FieldDocumentation from './field-documentation';
// eslint-disable-next-line import/no-cycle
import TypeDocumentation from './type-documentation';
import renderType from './utils/util';

type TypeLinkProps = {
  // eslint-disable-next-line react/require-default-props
  type?: GraphQLType | GraphQLNamedType;
};
const TypeLink = ({ type }: TypeLinkProps) => {
  const [content, setContent] = useState<ReactNode>();

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isType(type)) {
      setContent(<TypeDocumentation type={type as GraphQLNamedType} />);
    } else if (type) {
      setContent(<FieldDocumentation field={type as ExplorerFieldDef} />);
    }
  };
  if (!type) return null;

  return renderType(type, (namedType) => (
    <>
      <button
        type="button"
        key={namedType.name}
        className="graphiql-doc-explorer-type-name"
        onClick={onClick}
      >
        {namedType.name}
      </button>
      {content}
    </>
  ));
};

export default TypeLink;
