
import {FC} from 'react';

import classes from './Title.module.scss';

interface TitleProps {
    value: string
}

const Title: FC<TitleProps> = ({value}) => {
    return (
        <h3 className={classes['title']}>
            {value}
        </h3>
    );
}

export default Title;