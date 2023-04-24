import React, {FC} from 'react';
import classes from '../../styles/List.module.scss';
import Title from '../../UI/Title/Title';
import MyTable from '../../UI/MyTable/MyTable';
import { ICar} from '../../store/reducers/car/types';
import { IClient } from '../../store/reducers/client/types';


interface ListProps {
    title: string;
    items: ICar[] | IClient[];
    headlines: string[];
    image?: string;
}

const List:FC<ListProps> = ({title, items, headlines, image}) => {

    return (
        <div className={[classes['list'], '_container'].join(' ')}>
            <Title value={title}/>
            <MyTable items={items} headlines={headlines} image={image}/>
            <button className={classes['list__btn']}>Удалить</button>
        </div>
    );
}

export default List;