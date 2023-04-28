import React, {FC, useState, Dispatch, SetStateAction, ChangeEvent} from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { ICar } from '../../store/reducers/car/types';
import { RentActionsEnum } from '../../store/reducers/rent/types';
import classes from '../../styles/RentCar.module.scss';
import MyButton from '../../UI/MyButton/MyButton';
import MySelect from '../../UI/MySelect/MySelect';
import { RentActionCreators } from '../../store/reducers/rent/action-creators';
import { CarActionCreators } from '../../store/reducers/car/action-creators';
import { IClient } from '../../store/reducers/client/types';


interface RentCarProps {
    car: ICar;
    setRentVisible: Dispatch<SetStateAction<boolean>>;
}

const RentCar:FC<RentCarProps> = ({car, setRentVisible}) => {
    const {clients} = useTypedSelector(state => state.client);
    const dispatch = useDispatch();

    const [dateValue, setDateValue] = useState<string>('');
    const [selectedClient, setSelectedClient] = useState<string>('')

    const handlerClickOk = () => {
        const rentObject = {
            driverLicenceNumber: selectedClient,
            stateRegistrationNumber: car.stateRegistrationNumber,
            rentDate: new Date().toLocaleDateString(),
            returnDate: dateValue,
        }

        dispatch(RentActionCreators.AddRent(rentObject));
        dispatch(CarActionCreators.ChangeAvailableStatus(car.stateRegistrationNumber, false));
        setRentVisible(false);
    }

    const handlerClickNo = () => {
        setRentVisible(false);
    }

    const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDateValue(e.target.value)
    }

    return (
       <div className={classes['rent']} onClick={e => e.stopPropagation()}>
           <h3 className={classes['rent__title']}>
                Выдача автомобиля на прокат
           </h3>
           <div className={classes['rent__body']}>
                <div className={classes['rent__client']}>
                    <span>Клиент:</span><MySelect options={clients} selectedOption={0} setSelectedClient={setSelectedClient}/>
                </div>
                <div className={classes['rent__date_start']}>
                    <span>Дата выдачи:</span><div>{new Date().toLocaleDateString()}</div>
                </div>
                <div className={classes['rent__date_end']}>
                    <span>Дата возврата:</span><input type={'date'} onChange={e => handlerChange(e)} required value={dateValue} min="2023-04-28" max="2023-12-31"/>
                </div>
           </div>

           <div className={classes['rent__button']}>
                <div onClick={handlerClickNo}><MyButton value='Отмена' color='black'/></div>
                <div onClick={handlerClickOk}><MyButton value='Ок' color='blue'/></div>
           </div>
         
       </div>
    );
}

export default RentCar;