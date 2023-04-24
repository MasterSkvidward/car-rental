import React, {FC, useEffect} from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import AppRouter from './components/AppRouter/AppRouter';
import Footer from './components/Footer/Footer';

import { useDispatch } from 'react-redux';

// import { CreateTreeAC } from './store/reducers/mainReducer';
// import { CreateHashAC } from './store/reducers/carsReducer';
// import { CreateListAC } from './store/reducers/rentReducer';


import './styles/App.scss';
import carReducer from './store/reducers/car/carReducer';
import { CarActionCreators } from './store/reducers/car/action-creators';
import { ClientActionCreators } from './store/reducers/client/action-creators';

const App:FC = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(CarActionCreators.InitializeHashtable());
        dispatch(ClientActionCreators.InitializeAVLTREE());
        // dispatch(CreateListAC());
    }, [])

    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                <AppRouter/>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;
