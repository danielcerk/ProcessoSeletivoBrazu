import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import { FaWhatsapp } from "react-icons/fa";

export default function HeroSection() {
    return (
        <section className="py-5 text-center d-flex align-items-center" style={{ minHeight: "80vh" }}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={10} lg={8}>
                        <h1 className="display-4 fw-bold">Impulsione sua marca com a ProcessoSeletivoBrazu</h1>
                        <p className="lead mt-3 mb-4">
                            Estratégias digitais criativas para atrair mais clientes e crescer seu negócio.
                        </p>
                        <Button
                            variant="success"
                            size="lg"
                            href="https://wa.me/5575983252987"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Venha nos conhecer <FaWhatsapp />
                        </Button>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}
