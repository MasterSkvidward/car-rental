import React, {useState, ChangeEvent} from 'react';
import MyInput from '../../UI/MyInput/MyInput';

import classes from '../../styles/AddCar.module.scss';
import { useDispatch } from 'react-redux';
import { CarActionCreators } from '../../store/reducers/car/action-creators';
import MyButton from '../../UI/MyButton/MyButton';

const AddCar = () => {
    const dispatch = useDispatch();

    const [regNumber, setRegNumber] = useState<string>('ANNNAA-NN');
    const [regNumberDirty, setRegNumberDirty] = useState<boolean>(false);
    const [regNumberError, setRegNumberError] = useState<string>('');


    const [brand, setBrand] = useState<string>('');
    const [color, setColor] = useState<string>('');
    const [year, setYear] = useState<number>(2023);


    const addCar = () => {
        dispatch(CarActionCreators.AddCar({
            brand: brand,
            stateRegistrationNumber: regNumber,
            color: color,
            releaseYear: year,
            isAvailable: true,
        }))
    }

    const handlerBlur = () => {
       setRegNumberDirty(true);
    }

    const handlerRegNumber = (e:ChangeEvent<HTMLInputElement>) => {
        setRegNumber(e.target.value);
        const re = /^[АВЕКМНОРСТУХ]\d{3}[АВЕКМНОРСТУХ]{2}-\d{2}$/;
        if (!re.test(String(e.target.value))) {
            setRegNumberError('Гос. регистрационный номер не соотвествует формату!');
        } else {
            setRegNumberError('');
        }
    }

    
    return (
        <form className={classes['form']} onBlur={handlerBlur}>
            <h3 className={classes['form__title']}>Добавление автомобиля</h3>
            {(regNumberDirty && regNumberError) && <div className={classes['error']}>{regNumberError}</div>}
            <input className={classes['input']} placeholder={'Гос. регистрационный номер'} onChange={handlerRegNumber}/>
            <MyInput placeholder={'Марка'} setValue={setBrand}/>
            <MyInput placeholder={'Цвет'} setValue={setColor}/>
            <MyInput placeholder={'Год Выпуска'} setValue={value => setYear(Number(value))}/>
            <div className={classes['form__button']} onClick={addCar}>
                <MyButton value={'Добавить автомобиль'}/>
            </div>
        </form>
    );
}

export default AddCar;