import type { GraphQLArgument, GraphQLField, GraphQLInputField, GraphQLNamedType } from 'graphql';
import {
  isEnumType,
  isInputObjectType,
  isInterfaceType,
  isNamedType,
  isObjectType,
  isScalarType,
  isUnionType,
} from 'graphql';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { createContextHook, createNullableContext } from './context';
import { useSchemaContext } from './schema';

export type ExplorerFieldDef =
  | GraphQLField<unknown, unknown, unknown>
  | GraphQLInputField
  | GraphQLArgument;

export type ExplorerNavStackItem = {
  name: string;
  def?: GraphQLNamedType | ExplorerFieldDef;
};

export type ExplorerNavStack = [ExplorerNavStackItem, ...ExplorerNavStackItem[]];

const initialNavStackItem: ExplorerNavStackItem = { name: 'Docs' };

export type ExplorerContextType = {
  explorerNavStack: ExplorerNavStack;
  push(item: ExplorerNavStackItem): void;
  pop(): void;
  reset(): void;
};

export const ExplorerContext = createNullableContext<ExplorerContextType>('ExplorerContext');

export type ExplorerContextProviderProps = {
  children: ReactNode;
};

export const ExplorerContextProvider = (props: ExplorerContextProviderProps) => {
  const { schema, validationErrors } = useSchemaContext({
    nonNull: true,
    caller: ExplorerContextProvider,
  });

  const [navStack, setNavStack] = useState<ExplorerNavStack>([initialNavStackItem]);

  const push = useCallback((item: ExplorerNavStackItem) => {
    setNavStack((currentState) => {
      const lastItem = currentState.at(-1)!;
      return lastItem.def === item.def ? currentState : [...currentState, item];
    });
  }, []);

  const pop = useCallback(() => {
    setNavStack((currentState) =>
      currentState.length > 1 ? (currentState.slice(0, -1) as ExplorerNavStack) : currentState
    );
  }, []);

  const reset = useCallback(() => {
    setNavStack((currentState) =>
      currentState.length === 1 ? currentState : [initialNavStackItem]
    );
  }, []);

  useEffect(() => {
    if (schema == null || validationErrors.length > 0) {
      reset();
    } else {
      setNavStack((oldNavStack) => {
        if (oldNavStack.length === 1) {
          return oldNavStack;
        }
        const newNavStack: ExplorerNavStack = [initialNavStackItem];
        let lastEntity: GraphQLNamedType | GraphQLField<unknown, unknown, unknown> | null = null;
        for (const item of oldNavStack) {
          if (item === initialNavStackItem) {
            continue;
          }
          if (item.def) {
            if (isNamedType(item.def)) {
              const newType = schema.getType(item.def.name);
              if (newType) {
                newNavStack.push({
                  name: item.name,
                  def: newType,
                });
                lastEntity = newType;
              } else {
                break;
              }
            } else if (lastEntity === null) {
              break;
            } else if (isObjectType(lastEntity) || isInputObjectType(lastEntity)) {
              const field = lastEntity.getFields()[item.name];
              if (field) {
                newNavStack.push({
                  name: item.name,
                  def: field,
                });
              } else {
                break;
              }
            } else if (
              isScalarType(lastEntity) ||
              isEnumType(lastEntity) ||
              isInterfaceType(lastEntity) ||
              isUnionType(lastEntity)
            ) {
              break;
            } else {
              const field: GraphQLField<unknown, unknown, unknown> = lastEntity;
              const arg = field.args.find((a) => a.name === item.name);
              if (arg) {
                newNavStack.push({
                  name: item.name,
                  def: field,
                });
              } else {
                break;
              }
            }
          } else {
            lastEntity = null;
            newNavStack.push(item);
          }
        }
        return newNavStack;
      });
    }
  }, [reset, schema, validationErrors]);

  const value = useMemo<ExplorerContextType>(
    () => ({ explorerNavStack: navStack, push, pop, reset }),
    [navStack, push, pop, reset]
  );

  return <ExplorerContext.Provider value={value}>{props.children}</ExplorerContext.Provider>;
};

export const useExplorerContext = createContextHook(ExplorerContext);
