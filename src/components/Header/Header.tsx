import React, {useRef, useEffect} from 'react';
import { FC } from 'react';
import classes from '../../styles/Header.module.scss';
import Navbar from './Navbar';


const Header:FC = () => {
    const header = useRef<HTMLDivElement>(null);

    function handleScroll() {
        if (window.pageYOffset > 100) {
            header.current?.classList.add(classes.sticky);
        } else if (window.pageYOffset === 0) header.current?.classList.remove(classes.sticky);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, [])

    return (
        <div ref={header} className={classes.header}>
            <Navbar/>
        </div>
    );
}

export default Header;