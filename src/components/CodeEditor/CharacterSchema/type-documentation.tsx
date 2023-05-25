import {
  GraphQLEnumValue,
  GraphQLNamedType,
  isAbstractType,
  isEnumType,
  isInputObjectType,
  isInterfaceType,
  isNamedType,
  isObjectType,
} from 'graphql';
import { useState } from 'react';
import Argument from './argument';
import DefaultValue from './default-value';
import DeprecationReason from './deprecation-reason';
import FieldLink from './field-link';
import ExplorerSection from './section';
import TypeLink from './type-link';
import { ExplorerFieldDef } from './utils/context-explorer';
import MarkdownContent from './utils/markdown';
import { useSchemaContext } from './utils/schema';

type TypeDocumentationProps = {
  type: GraphQLNamedType;
};

const ImplementsInterfaces = ({ type }: { type: GraphQLNamedType }) => {
  if (!isObjectType(type)) {
    return null;
  }
  const interfaces = type.getInterfaces();
  return interfaces.length > 0 ? (
    <ExplorerSection title="Implements">
      {type.getInterfaces().map((implementedInterface) => (
        <div key={implementedInterface.name}>
          <TypeLink type={implementedInterface} />
        </div>
      ))}
    </ExplorerSection>
  ) : null;
};

const Field = ({ field }: { field: ExplorerFieldDef }) => {
  const args = 'args' in field ? field.args.filter((arg) => !arg.deprecationReason) : [];
  return (
    <div className="graphiql-doc-explorer-item">
      <div>
        <FieldLink field={field} />
        {args.length > 0 ? (
          <>
            (
            <span>
              {args.map((arg) =>
                args.length === 1 ? (
                  <Argument key={arg.name} arg={arg} inline />
                ) : (
                  <div key={arg.name} className="graphiql-doc-explorer-argument-multiple">
                    <Argument arg={arg} inline />
                  </div>
                )
              )}
            </span>
            )
          </>
        ) : null}
        {': '}
        <TypeLink type={field.type} />
        <DefaultValue field={field} />
      </div>
      {field.description ? (
        <MarkdownContent type="description" onlyShowFirstChild>
          {field.description}
        </MarkdownContent>
      ) : null}
      <DeprecationReason>{field.deprecationReason}</DeprecationReason>
    </div>
  );
};

const Fields = ({ type }: { type: GraphQLNamedType }) => {
  const [showDeprecated, setShowDeprecated] = useState(false);
  if (!isObjectType(type) && !isInterfaceType(type) && !isInputObjectType(type)) {
    return null;
  }

  const fieldMap = type.getFields();

  const fields: ExplorerFieldDef[] = [];
  const deprecatedFields: ExplorerFieldDef[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const field of Object.keys(fieldMap).map((name) => fieldMap[name])) {
    if (field.deprecationReason) {
      deprecatedFields.push(field);
    } else {
      fields.push(field);
    }
  }

  const ternaryOperator =
    // eslint-disable-next-line no-nested-ternary
    deprecatedFields.length > 0 ? (
      showDeprecated || fields.length === 0 ? (
        <ExplorerSection title="Deprecated Fields">
          {deprecatedFields.map((field) => (
            <Field key={field.name} field={field} />
          ))}
        </ExplorerSection>
      ) : (
        <button
          type="button"
          onClick={() => {
            setShowDeprecated(true);
          }}
        >
          Show Deprecated Fields
        </button>
      )
    ) : null;

  return (
    <>
      {fields.length > 0 ? (
        <ExplorerSection title="Fields">
          {fields.map((field) => (
            <Field key={field.name} field={field} />
          ))}
        </ExplorerSection>
      ) : null}
      {ternaryOperator}
    </>
  );
};

const EnumValue = ({ value }: { value: GraphQLEnumValue }) => {
  return (
    <div className="graphiql-doc-explorer-item">
      <div className="graphiql-doc-explorer-enum-value">{value.name}</div>
      {value.description ? (
        <MarkdownContent type="description">{value.description}</MarkdownContent>
      ) : null}
      {value.deprecationReason ? (
        <MarkdownContent type="deprecation">{value.deprecationReason}</MarkdownContent>
      ) : null}
    </div>
  );
};

const EnumValues = ({ type }: { type: GraphQLNamedType }) => {
  const [showDeprecated, setShowDeprecated] = useState(false);

  if (!isEnumType(type)) {
    return null;
  }

  const values: GraphQLEnumValue[] = [];
  const deprecatedValues: GraphQLEnumValue[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const value of type.getValues()) {
    if (value.deprecationReason) {
      deprecatedValues.push(value);
    } else {
      values.push(value);
    }
  }

  const ternaryOperator =
    // eslint-disable-next-line no-nested-ternary
    deprecatedValues.length > 0 ? (
      showDeprecated || values.length === 0 ? (
        <ExplorerSection title="Deprecated Enum Values">
          {deprecatedValues.map((value) => (
            <EnumValue key={value.name} value={value} />
          ))}
        </ExplorerSection>
      ) : (
        <button
          type="button"
          onClick={() => {
            setShowDeprecated(true);
          }}
        >
          Show Deprecated Values
        </button>
      )
    ) : null;

  return (
    <>
      {values.length > 0 ? (
        <ExplorerSection title="Enum Values">
          {values.map((value) => (
            <EnumValue key={value.name} value={value} />
          ))}
        </ExplorerSection>
      ) : null}
      {ternaryOperator}
    </>
  );
};

const PossibleTypes = ({ type }: { type: GraphQLNamedType }) => {
  const { schema } = useSchemaContext({ nonNull: true });
  if (!schema || !isAbstractType(type)) {
    return null;
  }
  return (
    <ExplorerSection title={isInterfaceType(type) ? 'Implementations' : 'Possible Types'}>
      {schema.getPossibleTypes(type).map((possibleType) => (
        <div key={possibleType.name}>
          <TypeLink type={possibleType} />
        </div>
      ))}
    </ExplorerSection>
  );
};

const TypeDocumentation = (props: TypeDocumentationProps) => {
  return isNamedType(props.type) ? (
    <>
      {props.type.description ? (
        <MarkdownContent type="description">{props.type.description}</MarkdownContent>
      ) : null}
      <ImplementsInterfaces type={props.type} />
      <Fields type={props.type} />
      <EnumValues type={props.type} />
      <PossibleTypes type={props.type} />
    </>
  ) : null;
};

export default TypeDocumentation;
