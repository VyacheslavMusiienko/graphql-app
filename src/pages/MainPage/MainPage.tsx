import ErrorBoundary from '../../components/ErrorBoundary';
import { CodeEditor, SelectorURI } from '../../components/CodeEditor';

const MainPage = () => {
  return (
    <ErrorBoundary>
      <SelectorURI />
      <CodeEditor />
      {/* <CharacterSchema /> */}
      {/* <CharacterSchema /> */}
    </ErrorBoundary>
  );
};

export default MainPage;
