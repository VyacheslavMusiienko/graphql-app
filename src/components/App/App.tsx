import { LoginPage } from '../../pages';
import Layout from '../../layout';
import { useAppSelector } from '../../hooks';

const App = () => {
  const { auth } = useAppSelector((state) => state.mainPageReducer);

  return auth ? <Layout /> : <LoginPage />;
};

export default App;
