import React from 'react';
import classes from '../styles/Cars.module.scss';
import { useTypedSelector } from '../hooks/useTypedSelector';
import car from '../images/car.png';
import List from '../components/List/List';
import { carHeadlines } from '../utils/data';

const Cars = () => {
    const {cars} = useTypedSelector(state => state.car)

    return (
       <div className={classes['cars']}>
            <List title={'Список всех автомобилей'} items={cars} headlines={carHeadlines} image={car}/>
       </div>
    )
}

export default Cars;