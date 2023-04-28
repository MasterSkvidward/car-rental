import React, {FC} from 'react';
import classes from '../styles/HomePage.module.scss';
import Car from '../components/Cars/Car';
import Client from '../components/Clients/Client';


const HomePage:FC = () => {
    return (
       <div className= {classes['homepage']}>
           <div className={[classes['homepage__container'], '_container'].join(' ')}>
                <Car/>
                <div className={classes['homepage__divider']}></div>
                <Client/>
           </div>
       </div>
    );
}

export default HomePage;