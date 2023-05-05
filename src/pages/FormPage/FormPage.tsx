import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { mainPageSlice } from '../../store/reducers/mainPageSlice';
import { Paths } from '../../utils/enums';

const FormPage = () => {
  const { isLoggedIn } = useAppSelector((state) => state.mainPageReducer);
  const dispatch = useAppDispatch();
  const { setLoggedIn } = mainPageSlice.actions;
  const logIn = () => {
    dispatch(setLoggedIn(true));
  };
  return (
    <div className="form">
      {!isLoggedIn ? (
        <>
          <h2>form page</h2>
          <button type="button" onClick={logIn}>
            login
          </button>
        </>
      ) : (
        <Navigate to={Paths.Main} />
      )}
    </div>
  );
};

export default FormPage;
