import React, {useState, ChangeEvent} from 'react';
import MyInput from '../../UI/MyInput/MyInput';

import classes from '../../styles/AddCar.module.scss';
import { useDispatch } from 'react-redux';
import { ClientActionCreators } from '../../store/reducers/client/action-creators';
import MyButton from '../../UI/MyButton/MyButton';

const AddClient = () => {
    const dispatch = useDispatch();

    const [licenceNumber, setLicenceNumber] = useState<string>('');
    const [licenceNumberDirty, setLicenceNumberDirty] = useState<boolean>(false);
    const [licenceNumberError, setLicenceNumberError] = useState<string>('');

    const [fullName, setFullName] = useState<string>('Bogdan');
    const [passportData, setPassportData] = useState<string>('');
    const [adress, setAdress] = useState<string>('');


    const addClient = () => {
        console.log('addClient');
        if (licenceNumber && !licenceNumberError && fullName && passportData && adress) {
            dispatch(ClientActionCreators.AddClient({
                fullName: fullName,
                driverLicenceNumber: licenceNumber,
                address: adress,
                passportInfo: passportData,
            }))
            alert('Клиент добавлен!')
        }
        
        else {
            alert('Клиент не добавлен!')
        }
     
    }

    const handlerBlur = () => {
        console.log('blur');
        
        setLicenceNumberDirty(true);
    }

    const handlerLicenceNumber = (e:ChangeEvent<HTMLInputElement>) => {
        
        setLicenceNumber(e.target.value);
        const re = /^\d{2}\s[АВЕКМНОРСТУХ]{2}\s\d{6}$/;
        if (!re.test(String(e.target.value))) {
            setLicenceNumberError('Номер водительского удостоверения не соотвествует формату!');
        } else {
            setLicenceNumberError('');
            // setLicenceNumberDirty(false);
        }
    }


    return (
        <form className={classes['form']} onBlur={handlerBlur}>
            <h3 className={classes['form__title']}>Добавление клиента</h3>
            {(licenceNumberDirty && licenceNumberError) && <div className={classes['error']}>{licenceNumberError}</div>}
            <input className={classes['input']} required={true} placeholder={'Номер водительского удостоверения'} onChange={handlerLicenceNumber}/>
            <MyInput placeholder={'ФИО'} setValue={setFullName}/>
            <MyInput placeholder={'Паспортные данные'} setValue={setPassportData}/>
            <MyInput placeholder={'Адрес'} setValue={setAdress}/>
            <div className={classes['form__button']} onClick={addClient}>
                <MyButton value={'Добавить клиента'}/>
            </div>
            
        </form>
    );
}

export default AddClient;