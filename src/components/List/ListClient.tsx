import React, {FC, MouseEvent, useState, useEffect} from 'react';
import classes from '../../styles/List.module.scss';
import Title from '../../UI/Title/Title';
import { CarActionsEnum, ICar} from '../../store/reducers/car/types';
import { IClient } from '../../store/reducers/client/types';
import MyButton from '../../UI/MyButton/MyButton';
import { useDispatch } from 'react-redux';
import { CarActionCreators } from '../../store/reducers/car/action-creators';
import { ClientActionCreators } from '../../store/reducers/client/action-creators';
import MyInput from '../../UI/MyInput/MyInput';
import useDebounce from '../../hooks/useDebounce';
import MyTableCar from '../../UI/MyTableCar/MyTableCar';
import MyTableClient from '../../UI/MyTableClient/MyTableClient';
import { RentActionCreators } from '../../store/reducers/rent/action-creators';


interface ListClientProps {
    title: string;
    items: IClient[];
    headlines: string[];
    image?: string;
}

const ListClient:FC<ListClientProps> = ({title, items, headlines, image}) => {

    const dispatch = useDispatch();
    const [value, setValue] = useState<string>('');
    const debouncedSearch = useDebounce(searchItems, 100);


    const handlerClick = (e: MouseEvent):void => {
        dispatch(ClientActionCreators.DeleteAll());
        dispatch(RentActionCreators.DeleteAllRents());
    }

  
    function searchItems() {
        dispatch(ClientActionCreators.FindClientList(value))
    }

    useEffect(() => {
        debouncedSearch();
    }, [value])

    
    return (
        <div className={[classes['list'], '_container'].join(' ')}>
            <Title value={title}/>
            <MyInput placeholder={'Найти клиента...'} setValue={setValue}/>
       
            <MyTableClient items={items} headlines={headlines} image={image}/>

            <div className={items.length? classes['list__btn']: classes['disabled']} onClick={handlerClick}>
                <MyButton value='Удалить'/>
            </div>
        </div>
    );
}

export default ListClient;