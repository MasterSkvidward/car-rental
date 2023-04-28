import React, {useState, useEffect} from 'react';
import MyInput from '../../UI/MyInput/MyInput';
import MyButton from '../../UI/MyButton/MyButton';

import classes from '../../styles/FindClient.module.scss';
import MyModal from '../../UI/MyModal/MyModal';
import ShowClient from './ShowClient';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { ClientActionCreators } from '../../store/reducers/client/action-creators';
import { IRent } from '../../store/reducers/rent/types';
import { CircularLinkedList } from '../../utils/sorts';


const FindClient = () => {
    const [licenceNumber, setLicenceNumber] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const {currentClient} = useTypedSelector(state => state.client);
    const {CircularLinkedList} = useTypedSelector(state => state.rent);

    const dispatch = useDispatch();

    const findClient = () => {
        dispatch(ClientActionCreators.FindClient(licenceNumber))
        setModalVisible(true);
    }

  

    return (
        <form className={classes['form']}>
            <MyModal visible={modalVisible} setVisible={setModalVisible}><ShowClient client={currentClient} setModalVisible={setModalVisible}/></MyModal>
            <h3 className={classes['form__title']}>Поиск клиента</h3>
           
            <ul className={classes['form__list']}>
                <span>Номер водительского удостоверения – строка формата «RR AA NNNNNN», где</span>
                <li>RR – код региона (цифры);</li>
                <li>AA – серия (буквы из следующего множества: А, В, Е, К, М, Н, О, Р, С, Т, У, Х);</li>
                <li>NNNNNN – порядковый номер удостоверения (цифры)</li>
            </ul>
            <MyInput placeholder={'Номер водительского удостоверения'} setValue={setLicenceNumber}/>
            <div className={classes['form__button']} onClick={findClient}>
                <MyButton value={'Найти'}/>
            </div>
        </form>
    );
}

export default FindClient;