import React from 'react';
import MyInput from '../../UI/MyInput/MyInput';

import classes from '../../styles/AddCar.module.scss';

const AddCar = () => {
    return (
        <form className={classes['form']}>
                <MyInput placeholder={'Марка'} pattern={"^[a-zA-Z\s]+$"}/>
                <MyInput placeholder={'Цвет'}/>
                <MyInput placeholder={'Год Выпуска'}/>
        </form>
    );
}

export default AddCar;