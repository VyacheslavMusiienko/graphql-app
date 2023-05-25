import { GraphQLNamedType, GraphQLType, isListType, isNonNullType } from 'graphql';

const renderType = (
  type: GraphQLType,
  renderNamedType: (namedType: GraphQLNamedType) => JSX.Element
): JSX.Element => {
  if (isNonNullType(type)) {
    return <>{renderType(type.ofType, renderNamedType)}!</>;
  }
  if (isListType(type)) {
    return <>[{renderType(type.ofType, renderNamedType)}]</>;
  }
  return renderNamedType(type);
};
export default renderType;
