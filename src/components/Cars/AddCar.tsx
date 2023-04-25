import React, {useState} from 'react';
import MyInput from '../../UI/MyInput/MyInput';

import classes from '../../styles/AddCar.module.scss';

const AddCar = () => {
    const [firstState, setFirstState] = useState<string>('');
    const [sercondState, setSecondState] = useState<string>('');
    const [thirdState, setThirdState] = useState<string>('');

    return (
        <form className={classes['form']}>
                <MyInput placeholder={'Марка'} setValue={setFirstState}/>
                <MyInput placeholder={'Цвет'} setValue={setSecondState}/>
                <MyInput placeholder={'Год Выпуска'} setValue={setThirdState}/>
        </form>
    );
}

export default AddCar;