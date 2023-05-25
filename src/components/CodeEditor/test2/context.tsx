import { GraphQLArgument, GraphQLField, GraphQLInputField } from 'graphql';

export type ExplorerFieldDef =
  | GraphQLField<unknown, unknown, unknown>
  | GraphQLInputField
  | GraphQLArgument;
