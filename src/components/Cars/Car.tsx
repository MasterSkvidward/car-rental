import React from 'react';
import Title from '../../UI/Title/Title';

import classes from '../../styles/Car.module.scss';
import AddCar from './AddCar';

const Car = () => {
    return (
       <div className={classes['car']}>
           <Title value='Автомобиль'/>
           <h3 className={classes['car__title']}>Добавление автомобиля</h3>
            <AddCar/>
          
       </div>
    );
}

export default Car;