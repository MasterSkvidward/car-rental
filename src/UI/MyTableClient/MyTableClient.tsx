import React, {FC, useState, useEffect} from 'react';

import car from '../../images/car.png';
import './MyTableClient.module.scss';
import { ICar } from '../../store/reducers/car/types';
import { IClient } from '../../store/reducers/client/types';
import MyModal from '../MyModal/MyModal';
import ShowCar from '../../components/Cars/ShowCar';
import ShowClient from '../../components/Clients/ShowClient';
import { isVisible } from '@testing-library/user-event/dist/utils';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { ClientActionCreators } from '../../store/reducers/client/action-creators';


interface MyTableClientProps {
    items: IClient[] | null;
    headlines: string[];
    image?: string;
}

const MyTableClient:FC<MyTableClientProps> = ({items, headlines, image}) => {
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const {currentClient} = useTypedSelector(state => state.client);

    const [currClient, setCurrClient] = useState<IClient>();
  
    const handlerClick = (client:IClient) => {
        // setCurrClient(client);
        dispatch(ClientActionCreators.FindClient(client.driverLicenceNumber));
        setModalVisible(true);
    }
   
    
    if (!items?.length) {
        return (
            <div style={{fontSize: 25}}>Список пуст!</div>
        )
    }
    
   
    return (
        <>
            <MyModal visible={modalVisible} setVisible={setModalVisible}><ShowClient client={currentClient} setModalVisible={setModalVisible}/></MyModal>
            <table>
                <thead>
                
                    <tr>
                        {headlines.map((item, index) => 
                            index 
                                ?  <th key={index}>{item}</th>
                                :  <th key={index} colSpan={2}>{item}</th>  
                        )}
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => 
                        <tr key={index} onClick={() => handlerClick(item)}>
                            <td><img src={image} alt="" width={52} height={52}/></td>
                            {Object.values(item).map((elem, index) =>
                                <td key={index}>{
                                    typeof elem === 'boolean'
                                        ? elem ? "В наличии" : "Нет в наличии"
                                        : elem
                                }</td>
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        </>

       
    );
}

export default MyTableClient;