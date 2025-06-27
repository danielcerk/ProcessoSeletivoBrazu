import React, { Component } from "react";
import style from './Navbar.module.css';

export default class Navbar extends Component {
    render() {
        return (
            <nav className={`navbar justify-content-center ${style.navbarCustom}`}>
                <span className={style.brandText}>ProcessoSeletivoBrazu</span>
            </nav>
        );
    }
}
