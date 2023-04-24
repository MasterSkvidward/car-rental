import React, {FC} from 'react';

import classes from './MyInput.module.scss';

interface MyInputProps {
    placeholder?: string;
    pattern?: string;
    type?: string;
}

const MyInput:FC<MyInputProps> = ({placeholder, pattern, type}) => {
    console.log(pattern);
    
    return (
       <input type={type} className={classes['input']} placeholder={placeholder} pattern={pattern}>
           
       </input>
    );
}

export default MyInput;