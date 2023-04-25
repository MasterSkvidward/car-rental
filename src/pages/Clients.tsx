import React from 'react';
import classes from '../styles/Clients.module.scss';
import Title from '../UI/Title/Title';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { clientHeadlines } from '../utils/data';
import MyTable from '../UI/MyTable/MyTable';
import client from "../images/client.jpg";
import List from '../components/List/List';

const Clients = () => {
    const {clients} = useTypedSelector(state => state.client)

    return (
        <div className={classes['clients']}>
            <List title={'Список всех клиентов'} items={clients} headlines={clientHeadlines} image={client} isCarList={false}/>
        </div>
    );
}

export default Clients;