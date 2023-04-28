import React, {FC, useState} from 'react';

import car from '../../images/car.png';
import './MyTableCar.module.scss';
import { ICar } from '../../store/reducers/car/types';
import { IClient } from '../../store/reducers/client/types';
import MyModal from '../MyModal/MyModal';
import ShowCar from '../../components/Cars/ShowCar';
import { useTypedSelector } from '../../hooks/useTypedSelector';


interface MyTableCarProps {
    items: ICar[];
    headlines: string[];
    image?: string;
}

const MyTableCar:FC<MyTableCarProps> = ({items, headlines, image}) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [currentCar, setCurrentCar] = useState<ICar>();
    const {currentClient} = useTypedSelector(state => state.client);
  
    const handlerClick = (car: ICar) => {
        setCurrentCar(car);
        setModalVisible(true);
    }


    if (!items.length) return (
        <div style={{fontSize: 25}}>Список пуст!</div>
    )
       
    
    return (
        <>
              <MyModal visible={modalVisible} setVisible={setModalVisible}><ShowCar modalVisible={modalVisible} currentClient={currentClient} car={currentCar} setModalVisible={setModalVisible}/></MyModal>
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

export default MyTableCar;