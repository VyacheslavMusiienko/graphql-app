import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { schemaFromExecutor } from '@graphql-tools/wrap';
import CodeMirror from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import { GraphQLSchema } from 'graphql';
import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import styles from './CodeEditor.module.scss';

const CodeEditor = () => {
  const [operations, setOperation] = useState<string>(`query {}`);
  const [codeRequest, setCodeRequest] = useState();

  const [schema, setSchema] = useState<GraphQLSchema | undefined>(undefined);

  const { schemaURI: urI } = useAppSelector((state) => state.EditorReducer);

  useEffect(() => {
    async function fetchSchema() {
      setSchema(undefined);
      const remoteExecutor = buildHTTPExecutor({ endpoint: urI });
      const postsSchema = await schemaFromExecutor(remoteExecutor);
      setSchema(postsSchema);
      setOperation(`query {}`);
      setCodeRequest(undefined);
    }
    fetchSchema();
  }, [urI]);

  const onChange = useCallback((valueEditor: string) => {
    setOperation(valueEditor);
  }, []);

  const makeRequest = async (query: string) => {
    return fetch(urI, {
      method: 'POST',
      headers: {
        'Content-type': ' application/json',
      },
      body: JSON.stringify({ query }),
    }).then((res) => res.json());
  };

  const handleQuery = async () => {
    if (operations) {
      await makeRequest(operations).then((data) => setCodeRequest(data));
    }
  };

  if (!schema) {
    return <h1>Loading...</h1>;
  }

  return (
    <main className={styles.main}>
      <CodeMirror
        value={operations}
        height="70vh"
        width="40vw"
        theme="dark"
        extensions={[graphql(schema)]}
        onChange={onChange}
        basicSetup
      />

      <div>
        <button className={styles.button} type="button" onClick={handleQuery}>
          Query
        </button>
      </div>

      <CodeMirror
        value={JSON.stringify(codeRequest, null, '\t')}
        height="70vh"
        width="40vw"
        theme="dark"
        editable
        readOnly
        basicSetup
      />
    </main>
  );
};
export default CodeEditor;
