import React, {useState} from 'react';
import MyInput from '../../UI/MyInput/MyInput';
import MyButton from '../../UI/MyButton/MyButton';

import classes from '../../styles/FindCar.module.scss';
import MyModal from '../../UI/MyModal/MyModal';
import ShowCar from './ShowCar';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { CarActionCreators } from '../../store/reducers/car/action-creators';

const FindCar = () => {
    const {currentClient} = useTypedSelector(state => state.client);
    const {currentCar} = useTypedSelector(state => state.car);

    const [regNumber, setRegNumber] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

  
    const dispatch = useDispatch();

    const findCar = () => {
        dispatch(CarActionCreators.FindCar(regNumber))
        setModalVisible(true);
    }

    return (
        <form className={classes['form']}>
            <MyModal visible={modalVisible} setVisible={setModalVisible}><ShowCar currentClient={currentClient} car={currentCar} modalVisible={modalVisible} setModalVisible={setModalVisible}/></MyModal>
            <h3 className={classes['form__title']}>Поиск автомобиля</h3>
           
            <ul className={classes['form__list']}>
                <span>Государственный регистрационный номер – строка формата «ANNNAA-NN», где</span>
                <li>N –цифра;</li>
                <li>A – буква из следующего множества: А, В, Е, К, М, Н, О, Р, С, Т, У, Х</li>
            </ul>
            <MyInput placeholder={'Гос. регистрационный номер'} setValue={setRegNumber}/>
            <div className={classes['form__button']} onClick={findCar}>
                <MyButton value={'Найти'}/>
            </div>
        </form>
    );
}

export default FindCar;