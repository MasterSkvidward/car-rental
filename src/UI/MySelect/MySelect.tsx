import React, {FC, useState, useEffect, useRef, MouseEvent, Dispatch, SetStateAction} from 'react';
import { useDispatch } from 'react-redux';
import classes from './MySelect.module.scss';
import {BsFilterLeft} from 'react-icons/bs';
import { IClient } from '../../store/reducers/client/types';

interface MySelectProps {
    options: IClient[];
    selectedOption: number;
    setSelectedClient: Dispatch<SetStateAction<string>>;
}

const MySelect:FC<MySelectProps> = ({options, selectedOption, setSelectedClient}) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<number>(selectedOption);
    const MySelect = useRef<HTMLDivElement>(null);

    const dispatch = useDispatch();

    const handlerDocumentClick = (e: Event):void => {
        setIsVisible(false);
    }

    const handlerButtonClick = (e: MouseEvent):void => {
        e.preventDefault();
        setIsVisible(!isVisible);
        e.stopPropagation();
    }

    const handlerOptionClick = (e: MouseEvent, index: number, option: IClient):void => {
        setSelectedIndex(index);
        setIsVisible(false);
        setSelectedClient(option.driverLicenceNumber);
    //     dispatch(FilterActionCreators.setAnime({order_by: options[index].order_by, sort: options[index].sort}));
    }

    useEffect(() => {
        setSelectedClient(options[0]?.driverLicenceNumber)
        document.addEventListener('click', handlerDocumentClick);
        return () => document.removeEventListener("click",  handlerDocumentClick);
    }, [])

    if (!options.length) return (<></>)

    return (
        <div className={classes.MySelect} ref={MySelect}>
            <div className={classes['MySelect__body']} onClick={handlerButtonClick}>
                <BsFilterLeft/>
                <button
                    className={classes['MySelect__btn']}
                >{options[selectedIndex].fullName}
                </button>
            </div>
            <div className={isVisible? [classes['MySelect__options'], classes['active']].join(' '): classes['MySelect__options']}>
                {options.map((option, index) =>
                    <div 
                        className={index === selectedIndex? [classes['MySelect__option'], classes['selected']].join(' ') : classes['MySelect__option']}
                        onClick={(e) => handlerOptionClick(e, index, option)}
                        key={index}
                        >{option.fullName}
                    </div>
                )}
                
            </div>
           
         </div>
    )
}

export default MySelect;