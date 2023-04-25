import React, {FC, MouseEvent, useState, useEffect} from 'react';
import classes from '../../styles/List.module.scss';
import Title from '../../UI/Title/Title';
import MyTable from '../../UI/MyTable/MyTable';
import { CarActionsEnum, ICar} from '../../store/reducers/car/types';
import { IClient } from '../../store/reducers/client/types';
import MyButton from '../../UI/MyButton/MyButton';
import { useDispatch } from 'react-redux';
import { CarActionCreators } from '../../store/reducers/car/action-creators';
import { ClientActionCreators } from '../../store/reducers/client/action-creators';
import MyInput from '../../UI/MyInput/MyInput';
import useDebounce from '../../hooks/useDebounce';


interface ListProps {
    title: string;
    items: ICar[] | IClient[];
    headlines: string[];
    image?: string;
    isCarList: boolean;
}

const List:FC<ListProps> = ({title, items, headlines, image, isCarList}) => {

    const dispatch = useDispatch();
    const [value, setValue] = useState<string>('');
    const debouncedSearch = useDebounce(searchItems, 100);


    const handlerClick = (e: MouseEvent):void => {
        isCarList
            ? dispatch(CarActionCreators.DeleteAllCars())
            : dispatch(ClientActionCreators.DeleteAll())
    }

  
    function searchItems() {
      
        isCarList
            ? dispatch(CarActionCreators.FindCarList(value))
            : dispatch(ClientActionCreators.FindClientList(value))
    }

    useEffect(() => {
        debouncedSearch();
    }, [value])

    return (
        <div className={[classes['list'], '_container'].join(' ')}>
            <Title value={title}/>
            <MyInput placeholder={isCarList? 'Найти автомобиль...' : 'Найти клиента...'} setValue={setValue}/>
            <MyTable items={items} headlines={headlines} image={image}/>
            <div className={classes['list__btn']} onClick={handlerClick}>
                <MyButton value='Удалить'/>
            </div>
        </div>
    );
}

export default List;