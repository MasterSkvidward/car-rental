import React, {FC} from 'react';
import classes from '../../styles/Navbar.module.scss';
import { Link } from 'react-router-dom';

const Navbar:FC= () => {
    return (
       <div className={[classes.navbar, '_container'].join(' ')}>
           <div className={classes.navbar__logo}><img src="" alt="" title='Car' /><span className={classes.navbar__title}>Car Rental</span></div>
           <div className={''}>
                <ul className={classes.navbar__links} >
                    <li className={classes.navbar__link}>Автомобили<Link to=''></Link></li>
                    <li className={classes.navbar__link}>Клиенты<Link to=''></Link></li>
                </ul>
           </div>
       </div>
    );
}

export default Navbar;