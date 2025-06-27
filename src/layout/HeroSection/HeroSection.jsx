import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa";

import style from './HeroSection.module.css';

export default function HeroSection() {

    const handleWhatsAppClick = () => {
        if (window.fbq) {
            window.fbq('trackCustom', 'WhatsAppClick');
        }
    };

    return (
        <section className={style.heroSection}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={10} lg={8}>
                        <h1 className={style.heroTitle}>Impulsione sua marca com a ProcessoSeletivoBrazu</h1>
                        <p className={style.heroText}>
                            Estratégias digitais criativas para atrair mais clientes e crescer seu negócio.
                        </p>
                        <Button
                            className={style.heroButton}
                            href="https://wa.me/5575983252987"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleWhatsAppClick}
                        >
                            Venha nos conhecer <FaWhatsapp style={{ marginLeft: '8px' }} />
                        </Button>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}
