import React from 'react';
import classes from '../styles/Clients.module.scss';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { clientHeadlines } from '../utils/data';
import client from "../images/client.jpg";
import ListClient from '../components/List/ListClient';


const Clients = () => {
    const {clients} = useTypedSelector(state => state.client);

    
    return (
        <div className={classes['clients']}>
            <ListClient title={'Список всех клиентов'} items={clients} headlines={clientHeadlines} image={client}/>
        </div>
    );
}

export default Clients;