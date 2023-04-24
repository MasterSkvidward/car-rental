import React, {FC} from 'react';
import classes from '../../styles/Navbar.module.scss';
import { Link } from 'react-router-dom';
import logo from '../../images/car_logo.png';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';

interface NavbarProprs {
    // onClick: () => void;
}

const Navbar:FC<NavbarProprs>= () => {
    const navigate = useNavigate();

    return (
       <div className={[classes.navbar, '_container'].join(' ')}>
           <div className={classes.navbar__logo} onClick={() => navigate(ROUTES.HOMEPAGE)}>
                <img src={logo} alt="" title='Car' /><span className={classes.navbar__title}>Car Rental</span>
            </div>
           <div className={''}>
                <ul className={classes.navbar__links} >
                    <li className={classes.navbar__link} onClick={() => navigate(ROUTES.CARS)}>Автомобили</li>
                    <li className={classes.navbar__link} onClick={() => navigate(ROUTES.CLIENTS)}>Клиенты</li>
                </ul>
           </div>
       </div>
    );
}

export default Navbar;