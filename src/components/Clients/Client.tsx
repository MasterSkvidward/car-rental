import React from 'react';
import AddClient from './AddClient';
import Title from '../../UI/Title/Title';
import classes from '../../styles/Client.module.scss';
import FindClient from './FindClient';

const Client = () => {
    return (
        <div className={classes['client']}>
            <Title value='Клиент'/>
            <AddClient/>
            <FindClient/>
        </div>
    );
}

export default Client;