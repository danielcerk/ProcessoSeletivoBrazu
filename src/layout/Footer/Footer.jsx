import React, { Component } from "react";

export default function Footer() {

    const date = new Date();
    const year = date.getFullYear()

    return (

        <footer className="bg-light text-center text-muted py-3 mt-auto">

            <small>© {year} ProcessoSeletivoBrazu. Todos os direitos reservados.</small>

        </footer>
    );
}
