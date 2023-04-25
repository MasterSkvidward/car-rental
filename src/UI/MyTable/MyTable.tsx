import React, {FC} from 'react';

import car from '../../images/car.png';
import './MyTable.module.scss';
import { ICar } from '../../store/reducers/car/types';
import { IClient } from '../../store/reducers/client/types';


interface MyTableProps {
    items: ICar[] | IClient[];
    headlines: string[];
    image?: string;
}

const MyTable:FC<MyTableProps> = ({items, headlines, image}) => {
    console.log(items);

    if (items.length === 0) return(<></>);
    
    return (
        <table>
            <thead>
                <tr>
                    {headlines.map((item, index) => 
                        index 
                            ?  <th key={index}>{item}</th>
                            :  <th key={index} colSpan={2}>{item}</th>  
                    )}
                </tr>
            </thead>
            <tbody>
                {items.map((item, index) => 
                    <tr key={index}>
                        <td><img src={image} alt="" width={52} height={52}/></td>
                        {Object.values(item).map((elem, index) =>
                            <td key={index}>{
                                typeof elem === 'boolean'
                                    ? elem ? "В наличии" : "Нет в наличии"
                                    : elem
                            }</td>
                        )}
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default MyTable;