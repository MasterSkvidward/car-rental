import React from 'react';
import { FC } from 'react';
import classes from '../../styles/Footer.module.scss';
import github_logo from '../../images/github_logo.png';
import { useNavigate } from 'react-router-dom';

const Footer:FC = () => {
    const githubLink:string = 'https://github.com/MasterSkvidward';
    const navigate = useNavigate();

    return (
       <div className={classes.footer}>
            <div className={[classes.footer__container, '_container'].join(' ')}>
                <div className={classes.footer__body}>©Car Rental 2023</div>
                <div className={classes.footer__logo}><a href={githubLink}><img src={github_logo} alt="GitHub" /></a></div>
            </div>
       </div>
    );
}

export default Footer;