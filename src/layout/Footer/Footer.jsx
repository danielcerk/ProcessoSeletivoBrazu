import React from "react";
import style from './Footer.module.css';

export default function Footer() {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <footer className={style.footerCustom}>
            <small>© {year} ProcessoSeletivoBrazu. Todos os direitos reservados.</small>
        </footer>
    );
}
