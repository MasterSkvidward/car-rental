import React, {FC} from 'react';
import classes from './MyButton.module.scss';


interface MyButtonProps {
    value: string;
    color?: string; 
}

const MyButton:FC<MyButtonProps> = ({value, color}) => {
    return (
       <button className={color? [classes[color], classes['button']].join(' '):classes['button']} onClick={e => e.preventDefault()}>
           {value}
       </button>
    );
}

export default MyButton;