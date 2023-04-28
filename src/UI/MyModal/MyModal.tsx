import React, {FC, PropsWithChildren, Dispatch, SetStateAction, useRef} from 'react';
import classes from './MyModal.module.scss';


interface MyModalProps extends PropsWithChildren {
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>;
}

const MyModal:FC<MyModalProps> = ({children, visible, setVisible}) => {
    const rootClasses = [classes['myModal']];
    if (visible) rootClasses.push(classes.active);

    return (
       <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            {children}
       </div>
    );
}

export default MyModal;