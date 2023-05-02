import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import Layout from './layout/layout';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import MainPage from './pages/MainPage/MainPage';
import FormPage from './pages/FormPage/FormPage';
import GraphqlPage from './pages/GraphqlPage/GraphqlPage';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/graphql" element={<GraphqlPage />} />
        </Route>
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
    </>
  );
}

export default App;
