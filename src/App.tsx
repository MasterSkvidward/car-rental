import React, {FC} from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import AppRouter from './components/AppRouter/AppRouter';
import Footer from './components/Footer/Footer';

import './styles/App.scss';

const App:FC = () => {
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
