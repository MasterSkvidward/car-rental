import React, {FC, Dispatch, SetStateAction, ChangeEvent} from 'react';
import classes from './MyInput.module.scss';

interface MyInputProps {
    placeholder: string;
    setValue:Dispatch<SetStateAction<string>>;
}

const MyInput:FC<MyInputProps> = ({placeholder, setValue}) => {

    const handlerChange = (e: ChangeEvent<HTMLInputElement>):void => {
        setValue(e.target.value)
    }

    return (
        <input className={classes.input} placeholder={placeholder} onChange={handlerChange} type="text">
            
        </input>
    );
}

export default MyInput;