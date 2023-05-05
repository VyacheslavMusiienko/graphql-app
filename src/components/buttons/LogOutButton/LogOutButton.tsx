import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks';
import { mainPageSlice } from '../../../store/reducers/mainPageSlice';
import { Paths } from '../../../utils/enums';
import Button from '../Button';

const LogOutButton = () => {
  const dispatch = useAppDispatch();
  const { setLoggedIn } = mainPageSlice.actions;
  const navigate = useNavigate();
  const logOut = () => {
    dispatch(setLoggedIn(false));
    navigate(Paths.Form);
  };
  return <Button onClick={logOut}>logOut</Button>;
};

export default LogOutButton;
