import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { schemaFromExecutor } from '@graphql-tools/wrap';
import CodeMirror from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import { GraphQLSchema } from 'graphql';
import { lazy, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../store';

import Loader from '../loader';
import styles from './CodeEditor.module.scss';

const CharacterSchema = lazy(() => import('./CharacterSchema/CharacterSchema'));

const CodeEditor = () => {
  const [operations, setOperation] = useState<string>(`query {}`);
  const [codeRequest, setCodeRequest] = useState();
  const [errorVal, setError] = useState<string | undefined>(undefined);
  const { t } = useTranslation();

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
    try {
      const response = await fetch(urI, {
        method: 'POST',
        headers: {
          'Content-type': ' application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
    return undefined;
  };

  const handleQuery = async () => {
    try {
      if (operations) {
        const data = await makeRequest(operations);
        setCodeRequest(data);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(`Error: ${error.message}`);
      }
    }
    setTimeout(() => setError(undefined), 2000);
  };

  if (!schema) {
    return <Loader active />;
  }

  return (
    <main>
      <CharacterSchema schema={schema} />
      <div className={styles.main}>
        <div>
          <div className={styles.section}>{t('var_section')}</div>
          <CodeMirror
            value={operations}
            height="70vh"
            width="40vw"
            theme="dark"
            extensions={[graphql(schema)]}
            onChange={onChange}
            basicSetup
          />
        </div>

        <div>
          <button className={styles.button} type="button" onClick={handleQuery}>
            {t('query')}
          </button>
        </div>

        <div>
          <div className={styles.section}>{t('res_section')}</div>
          <CodeMirror
            value={JSON.stringify(codeRequest, null, '\t')}
            height="70vh"
            width="40vw"
            theme="dark"
            editable
            readOnly
            basicSetup
          />
        </div>
      </div>
      {errorVal && (
        <div className={styles.wrapper}>
          <div className={styles.error}>{errorVal}</div>
        </div>
      )}
    </main>
  );
};
export default CodeEditor;
