import React from 'react';
import { FC } from 'react';
import classes from '../../styles/Header.module.scss';
import Navbar from './Navbar';

const Header:FC = () => {
    return (
       <div className={classes.header}>
           <Navbar/>
       </div>
    );
}

export default Header;