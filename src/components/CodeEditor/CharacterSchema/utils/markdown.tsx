import { forwardRef } from 'react';

type MarkdownContentProps = {
  children: string;
  onlyShowFirstChild?: boolean;
  type: 'description' | 'deprecation';
};

const MarkdownContent = forwardRef<
  HTMLDivElement,
  MarkdownContentProps & Omit<JSX.IntrinsicElements['div'], 'children'>
>(({ children, onlyShowFirstChild, type, ...props }, ref) => {
  const classNames = [`graphiql-markdown-${type}`];
  if (props.className) {
    classNames.push(props.className);
  }

  return <div {...props} ref={ref} className={classNames.join(' ')} />;
});

MarkdownContent.displayName = 'MarkdownContent';
MarkdownContent.defaultProps = {
  onlyShowFirstChild: false,
};

export default MarkdownContent;
