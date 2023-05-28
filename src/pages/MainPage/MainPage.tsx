import { CodeEditor, SelectorURI } from '../../components/CodeEditor';
import ErrorBoundary from '../../components/ErrorBoundary';

const MainPage = () => {
  return (
    <ErrorBoundary>
      <SelectorURI />
      <CodeEditor />
    </ErrorBoundary>
  );
};

export default MainPage;
