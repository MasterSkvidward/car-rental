import React, {FC, useState, useEffect, Dispatch, SetStateAction, MouseEvent} from 'react';
import { useDispatch } from 'react-redux';
import { CarActionCreators } from '../../store/reducers/car/action-creators';
import { ICar } from '../../store/reducers/car/types';
import { ClientActionCreators } from '../../store/reducers/client/action-creators';
import { IClient } from '../../store/reducers/client/types';
import RentCar from './RentCar';

import classes from '../../styles/ShowCar.module.scss';
import MyButton from '../../UI/MyButton/MyButton';
import { carHeadlines } from '../../utils/data';
import carImg from '../../images/car.png';
import MyModal from '../../UI/MyModal/MyModal';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { CircularLinkedList as List } from '../../utils/sorts';
import { IRent } from '../../store/reducers/rent/types';

import { RentActionCreators } from '../../store/reducers/rent/action-creators';

interface ShowCarProps {
    currentClient: IClient | null;
    car: ICar | undefined;
    modalVisible: boolean;
    setModalVisible: Dispatch<SetStateAction<boolean>>;
}

const ShowCar:FC<ShowCarProps> = ({currentClient, car, modalVisible,  setModalVisible}) => {
    const dispatch = useDispatch();
    const {CircularLinkedList} = useTypedSelector(state => state.rent);
    const {avlTree} = useTypedSelector(state => state.client);

    const [isOwned, setIsOwned] = useState<boolean>(false);
    const [rentVisible, setRentVisible] = useState<boolean>(false);
    const [carOwnerNumber, setCarOwnerNumber] = useState<IRent|null>(null)
    // const [isRepairing, setIsRepairing] = useState(car?.isAvailable);

    const handlerClickOk = () => {
        setModalVisible(false);
    }

    useEffect(() => {
        setIsOwned(false);
        if (CircularLinkedList && car) {
            let owner = CircularLinkedList.FindCarRent(car?.stateRegistrationNumber);
            if (owner) {
                dispatch(ClientActionCreators.FindClient(owner.driverLicenceNumber))
                setCarOwnerNumber(owner);
                setIsOwned(true);
            }
        }
    }, [car?.isAvailable, car, modalVisible, setModalVisible])



    if (!car) return (
        <div className={classes['car']} onClick={e => e.stopPropagation()}>
            <div className={classes['car__title']}>Автомобиль</div> 
            <div className={classes['car__not-found']}>Автомобиль не найден!</div>
            <div onClick={handlerClickOk} style={{marginLeft: 'auto'}}>
                <MyButton value={'Ок'} color={'blue'}/>
            </div>
        </div>
    );

    const handlerClickDelete = () => {
        dispatch(CarActionCreators.DeleteCar(car.stateRegistrationNumber));
        dispatch(RentActionCreators.DeleteRent(car.stateRegistrationNumber));
        setIsOwned(false);
        setModalVisible(false);
    }

    const handlerClickRepare = (e:MouseEvent, status:boolean) => {
        dispatch(CarActionCreators.ChangeAvailableStatus(car.stateRegistrationNumber, status));
        // setIsRepairing(!status);
        e.stopPropagation();
    }

    const handlerClickRent = () => {
        setRentVisible(true);
    }

    const handlerClickReturn = (regNumber: string) => {
        dispatch(RentActionCreators.DeleteRent(regNumber));
        dispatch(CarActionCreators.ChangeAvailableStatus(regNumber, true));
    }

    return (
       <div className={classes['car']} onClick={e => e.stopPropagation()}>
            <MyModal visible={rentVisible} setVisible={setRentVisible}><RentCar car={car} setRentVisible={setRentVisible}/></MyModal>
            <div className={classes['car__title']}>Автомобиль</div>
            {!car
                ? <>
                    <div className={classes['car__not-found']}>Автомобиль не найден!</div>
                    <div onClick={handlerClickOk} style={{marginLeft: 'auto'}}>
                        <MyButton value={'Ок'} color={'blue'}/>
                    </div>
                </>

                :  <>
                        <table>
                            <thead>
                                <tr>
                                    {carHeadlines.map((item, index) => 
                                        index 
                                            ?  <th key={index}>{item}</th>
                                            :  <th key={index} colSpan={2}>{item}</th>  
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                    <tr>
                                        <td><img src={carImg} alt="" width={52} height={52}/></td>
                                        {Object.values(car).map((elem, index) =>
                                            <td key={index}>{
                                                typeof elem === 'boolean'
                                                    ? elem 
                                                        ? "В наличии" 
                                                        : "Нет в наличии"
                                                    : elem
                                            }</td>
                                        )}
                                    </tr>
    
                            </tbody>
                        </table>
                        

                        {isOwned && !car.isAvailable && currentClient &&
                            <div className={classes['car__renter']}>
                                <div className={classes['car__arend']}>
                                    <span className={classes['car__arendator']}>Текущий арендатор:</span><span className={classes['car__fullname']}>{`${carOwnerNumber?.driverLicenceNumber? carOwnerNumber.driverLicenceNumber : ''} - ${currentClient?.fullName}`}</span>
                                </div>
                                <div className={classes['car__date']}>
                                    <div className={classes['car__date_from']}>
                                        <span>Дата выдачи:</span><div className={classes['bold']}>{carOwnerNumber?.rentDate}</div>
                                        
                                    </div>
                                    <div className={classes['car__date_to']}>
                                        <span>Дата возврата:</span><div className={classes['bold']}>{carOwnerNumber?.returnDate}</div>
                                    </div>
                                </div>              
                            </div>
                        }

                        

                        <div className={classes['car__buttons']}>
                            {!car.isAvailable 
                                ? isOwned 
                                    ? <div onClick={() => handlerClickReturn(car.stateRegistrationNumber)}><MyButton value={'Вернуть'} color={'black'}/></div>
                                    :
                                        <div onClick={(e) => handlerClickRepare(e, true)}><MyButton value={'Вернуть из ремонта'} color={'black'}/></div>
                                : 
                                    <div className={classes['car__first']}>
                                         <div onClick={(e) => handlerClickRepare(e, false)}><MyButton value={'Отправить в ремонт'} color={'black'}/></div>
                                         {avlTree.treeElements.length ?<div onClick={handlerClickRent}><MyButton value={'Выдать на прокат'} color={'black'}/></div>:<></>}
                                    </div>
                            }
                          
                            <div className={classes['car__second']}>
                                <div onClick={handlerClickDelete}>
                                    <MyButton value={'Удалить'}/>
                                </div>
                                <div onClick={handlerClickOk}>
                                    <MyButton value={'Ок'} color={'blue'}/>
                                </div>
                            </div>
                        </div> 
                    </>
            }
         
       </div>
    );
}

export default ShowCar;