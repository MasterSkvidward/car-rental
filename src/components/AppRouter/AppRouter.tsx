import React, {FC} from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';
import HomePage from '../../pages/HomePage';
import Error from '../../pages/Error';

const AppRouter:FC = () => {
    return (
      <Routes>
        <Route path={ROUTES.HOMEPAGE} element={<HomePage/>}/>
        <Route path={ROUTES.CARS} element={<HomePage/>}/>
        <Route path={ROUTES.CLIENTS} element={<HomePage/>}/>
        <Route path={ROUTES.ERROR} element={<Error/>}/>
        <Route path={ROUTES.ANY} element={<Navigate to={ROUTES.ERROR} replace/>}/>
      </Routes>
    );
}

export default AppRouter;