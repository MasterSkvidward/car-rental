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
import { RentActionCreators } from '../../store/reducers/rent/action-creators';


interface ListCarProps {
    title: string;
    items: ICar[];
    headlines: string[];
    image?: string;
}

const ListCar:FC<ListCarProps> = ({title, items, headlines, image}) => {

    const dispatch = useDispatch();
    const [value, setValue] = useState<string>('');
    const debouncedSearch = useDebounce(searchItems, 100);


    const handlerClick = (e: MouseEvent):void => {
        dispatch(CarActionCreators.DeleteAllCars());
        dispatch(RentActionCreators.DeleteAllRents());
    }

  
    function searchItems() {
        dispatch(CarActionCreators.FindCarList(value))
    }

    useEffect(() => {
        debouncedSearch();
    }, [value])


    return (
        <div className={[classes['list'], '_container'].join(' ')}>
            <Title value={title}/>
            <MyInput placeholder={'Найти автомобиль...'} setValue={setValue}/>
           
            <MyTableCar items={items} headlines={headlines} image={image}/>

            <div className={items.length? classes['list__btn']: classes['disabled']} onClick={handlerClick}>
                <MyButton value='Удалить'/>
            </div>
        </div>
    );
}

export default ListCar;