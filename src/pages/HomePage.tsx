import React, {FC} from 'react';
import classes from '../styles/HomePage.module.scss';
import Car from '../components/Cars/Car';
import Title from '../UI/Title/Title';

const HomePage:FC = () => {
    return (
       <div className= {classes['homepage']}>
           <div className={[classes['homepage__container'], '_container'].join(' ')}>
                <Car/>
           </div>
       </div>
    );
}

export default HomePage;