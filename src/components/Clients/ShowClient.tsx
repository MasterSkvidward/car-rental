import React, {FC, Dispatch, SetStateAction, useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { ClientActionCreators } from '../../store/reducers/client/action-creators';
import { IClient } from '../../store/reducers/client/types';

import classes from '../../styles/ShowClient.module.scss';
import MyButton from '../../UI/MyButton/MyButton';
import { clientHeadlines } from '../../utils/data';
import clientImg from '../../images/client.jpg';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { IRent } from '../../store/reducers/rent/types';
import { RentActionCreators } from '../../store/reducers/rent/action-creators';
import { CarActionCreators } from '../../store/reducers/car/action-creators';


interface ShowClientProps {
    client: IClient | null;
    setModalVisible: Dispatch<SetStateAction<boolean>>;
}

const ShowClient:FC<ShowClientProps> = ({client, setModalVisible}) => {
    const dispatch = useDispatch();
    const {currentClient} = useTypedSelector(state => state.client);
    const {CircularLinkedList} = useTypedSelector(state => state.rent);

    const [rentedCars, setRentedCars] = useState<IRent[]>([]);

    const handlerClickOk = () => {
        setModalVisible(false);
    }

    useEffect(() => {
        setRentedCars([]);
        if (currentClient && CircularLinkedList) {
            let result:IRent[] = CircularLinkedList.FindClientRent(currentClient.driverLicenceNumber);
            if (result.length) {
                setRentedCars(result);
            }
        }      
    }, [currentClient])

    if (!client) return (
        <div className={classes['client']} onClick={e => e.stopPropagation()}>
            <div className={classes['client__title']}>Клиент</div>  
            <div className={classes['client__not-found']}>Клиент не найден!</div>
            <div onClick={handlerClickOk} style={{marginLeft: 'auto'}}>
                <MyButton value={'Ок'} color={'blue'}/>
            </div>
        </div>
    )

    const handlerClickDelete = () => {
        dispatch(ClientActionCreators.DeleteClient(client.driverLicenceNumber));
        if (rentedCars.length) {
            for (const elem of rentedCars) {
                dispatch(RentActionCreators.DeleteRent(elem.stateRegistrationNumber));
                dispatch(CarActionCreators.ChangeAvailableStatus(elem.stateRegistrationNumber, true));
            }
        }

        setModalVisible(false);
    }

    const handlerClickReturn = (regNumber: string) => {
        dispatch(RentActionCreators.DeleteRent(regNumber));
        dispatch(CarActionCreators.ChangeAvailableStatus(regNumber, true));
        setRentedCars(rentedCars.filter((car) => car.stateRegistrationNumber !== regNumber));
    }


    return (
       <div className={classes['client']} onClick={e => e.stopPropagation()}>
            <div className={classes['client__title']}>Клиент</div>
            {!client
                ?   <>
                    <div className={classes['client__not-found']}>Клиент не найден!</div>
                    <div onClick={handlerClickOk} style={{marginLeft: 'auto'}}>
                        <MyButton value={'Ок'} color={'blue'}/>
                    </div>
                    </>
                
                :  <>
                        <table>
                            <thead>
                                <tr>
                                    {clientHeadlines.map((item, index) => 
                                        index 
                                            ?  <th key={index}>{item}</th>
                                            :  <th key={index} colSpan={2}>{item}</th>  
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                    <tr>
                                        <td><img src={clientImg} alt="" width={52} height={52}/></td>
                                        {Object.values(client).map((elem, index) =>
                                            <td key={index}>{
                                                typeof elem === 'boolean'
                                                    ? elem ? "В наличии" : "Нет в наличии"
                                                    : elem
                                            }</td>
                                        )}
                                    </tr>
    
                            </tbody>
                        </table>

                        {rentedCars.length 
                            ?
                                <div className={classes['rent']}>
                                    <h3 className={classes['rent__title']}>Арендованные автомобили</h3>
                                    <div className={classes['rent__body']}>
                                    {rentedCars.map((item, index) =>
                                        <div className={classes['rent__item']} key={index}>
                                            <div className={classes['rent__number']}>
                                                <span></span><span className={classes['bold']}>{item.stateRegistrationNumber}</span>
                                            </div>
                                            <div className={classes['car__date']}>
                                            <div className={classes['car__date_from']}>
                                                <span>Дата выдачи:</span><div className={classes['bold']}>{item.rentDate}</div>
                                                
                                            </div>
                                            <div className={classes['car__date_to']}>
                                                <span>Дата возврата:</span><div className={classes['bold']}>{item.returnDate}</div>
                                            </div>
                                            
                                        </div>  
                                        <div className={classes['car__button']} onClick={() => handlerClickReturn(item.stateRegistrationNumber)}>
                                            <MyButton value='Возврат' color='black'/>
                                        </div>       
                                </div>
                            )}
                            </div>
                        </div>


                            : <></>
                        }

                       

                        
                        <div className={classes['client__buttons']}>
                            <div onClick={handlerClickDelete}>
                                <MyButton value={'Удалить'}/>
                            </div>
                            <div onClick={handlerClickOk}>
                                <MyButton value={'Ок'} color={'blue'}/>
                            </div>
                            
                        </div> 
                    </>
            }
         
       </div>
    );
}

export default ShowClient;