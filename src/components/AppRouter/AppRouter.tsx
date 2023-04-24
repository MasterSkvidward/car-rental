import React, {FC} from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';
import HomePage from '../../pages/HomePage';
import Error from '../../pages/Error';
import Cars from '../../pages/Cars';
import Clients from '../../pages/Clients';

const AppRouter:FC = () => {
    return (
      <Routes>
        <Route path={ROUTES.HOMEPAGE} element={<HomePage/>}/>
        <Route path={ROUTES.CARS} element={<Cars/>}/>
        <Route path={ROUTES.CLIENTS} element={<Clients/>}/>
        <Route path={ROUTES.ERROR} element={<Error/>}/>
        <Route path={ROUTES.ANY} element={<Navigate to={ROUTES.ERROR} replace/>}/>
      </Routes>
    );
}

export default AppRouter;