import React from 'react';
import classes from '../styles/Cars.module.scss';
import { useTypedSelector } from '../hooks/useTypedSelector';
import car from '../images/car.png';
import { carHeadlines } from '../utils/data';
import ListCar from '../components/List/ListCar';


const Cars = () => {
    const {cars} = useTypedSelector(state => state.car)

    
    return (
       <div className={classes['cars']}>
            <ListCar title={'Список всех автомобилей'} items={cars} headlines={carHeadlines} image={car}/>
       </div>
    )
}

export default Cars;