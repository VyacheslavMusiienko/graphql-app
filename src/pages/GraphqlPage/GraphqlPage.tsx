import Editor from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import { useRef, useState } from 'react';
import CharacterSchema from './GraphqlPlayground';

const GraphqlPage = () => {
  const [codeReader] = useState<string>(`query {
    characters{results {
      episode {
        id
        name
      }
    }}
    }`);
  const [codeRequest, setCodeRequest] = useState();
  const monacoRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  //   const url = 'https://rickandmortyapi.com/graphql';
  const url = 'https://spacex-production.up.railway.app/';
  //   const url = 'https://swapi-graphql.netlify.app/.netlify/functions/index';
  //   const url = 'https://countries.trevorblades.com/graphql';

  const optionsReader: editor.IStandaloneEditorConstructionOptions = {
    readOnly: false,
    minimap: { enabled: false },
  };
  const optionsRequest: editor.IStandaloneEditorConstructionOptions = {
    readOnly: true,
    minimap: { enabled: false },
  };

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    monacoRef.current = editor;
  };

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
    const editorValue = monacoRef.current?.getValue();
    if (editorValue) {
      await makeRequest(editorValue).then((data) => setCodeRequest(data));
    }
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Editor
          height="70vh"
          width="50vw"
          theme="vs-dark"
          defaultLanguage="graphql"
          value={codeReader}
          onMount={(editor) => handleEditorDidMount(editor)}
          options={optionsReader}
        />

        <button type="button" onClick={handleQuery}>
          Query
        </button>

        <Editor
          height="70vh"
          width="50vw"
          theme="vs-dark"
          options={optionsRequest}
          value={JSON.stringify(codeRequest, null, 2)}
        />
      </div>
      <CharacterSchema />
    </>
  );
};

export default GraphqlPage;
