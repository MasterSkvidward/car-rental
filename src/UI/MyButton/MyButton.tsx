import React, {FC} from 'react';
import classes from './MyButton.module.scss';


interface MyButtonProps {
    value: string;
}

const MyButton:FC<MyButtonProps> = ({value}) => {
    return (
       <button className={classes['button']}>
           {value}
       </button>
    );
}

export default MyButton;