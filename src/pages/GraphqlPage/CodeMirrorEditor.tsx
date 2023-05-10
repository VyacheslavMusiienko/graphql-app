import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { schemaFromExecutor } from '@graphql-tools/wrap';
import CodeMirror from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import { GraphQLSchema } from 'graphql';
import React, { useEffect, useState } from 'react';

const CodeMirrorEditor = () => {
  const [operations, setOperation] = useState<string>(`query {
    characters{results {
          episode {
            id
            name
          }
        }}
        }`);

  const [schema, setSchema] = useState<GraphQLSchema | undefined>(undefined);
  const [codeRequest, setCodeRequest] = useState();

  const url = 'https://rickandmortyapi.com/graphql';
  //   const url = 'https://spacex-production.up.railway.app/';
  //   const url = 'https://swapi-graphql.netlify.app/.netlify/functions/index';
  //   const url = 'https://countries.trevorblades.com/graphql';

  useEffect(() => {
    async function fetchSchema() {
      const remoteExecutor = buildHTTPExecutor({ endpoint: url });
      const postsSchema = await schemaFromExecutor(remoteExecutor);
      setSchema(postsSchema);
    }
    fetchSchema();
  }, []);

  const onChange = React.useCallback((value: string) => {
    setOperation(value);
  }, []);

  const makeRequest = async (query: string) => {
    return fetch(url, {
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
    <div style={{ display: 'flex' }}>
      <CodeMirror
        value={operations}
        height="70vh"
        width="800px"
        theme="dark"
        extensions={[graphql(schema)]}
        onChange={onChange}
      />

      <button type="button" onClick={handleQuery}>
        Query
      </button>

      <CodeMirror
        value={JSON.stringify(codeRequest, null, '\t')}
        height="70vh"
        width="800px"
        theme="dark"
        editable
      />
    </div>
  );
};
export default CodeMirrorEditor;
