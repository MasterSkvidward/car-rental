import React from 'react';
import Title from '../../UI/Title/Title';

import classes from '../../styles/Car.module.scss';
import AddCar from './AddCar';
import FindCar from './FindCar';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const Car = () => {

    return (
        <div className={classes['car']}>
            <Title value='Автомобиль'/>
            <AddCar/>
            <FindCar/>
        </div>
    );
}

export default Car;