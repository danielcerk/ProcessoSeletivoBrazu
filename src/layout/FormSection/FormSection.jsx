import React, { useRef, useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import emailjs from "@emailjs/browser";

import style from './FormSection.module.css';

export default function FormSection() {
    const formRef = useRef();
    const [sent, setSent] = useState(false);
    const [error, setError] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                import.meta.env.VITE_SERVICE_KEY,
                import.meta.env.VITE_TEMPLATE_ID,
                formRef.current,
                import.meta.env.VITE_PUBLIC_KEY
            )
            .then(() => {
                setSent(true);
                setError(false);
                formRef.current.reset();

                if (window.fbq) {

                    window.fbq('track', 'Lead');
                    
                }
            })
            .catch(() => {
                setError(true);
                setSent(false);
            });
    };

    return (
        <section className={style.section}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={8}>
                        <h2 className={`text-center ${style.title}`}>Entre em Contato</h2>

                        {sent && <Alert variant="success">Mensagem enviada com sucesso!</Alert>}
                        {error && <Alert variant="danger">Erro ao enviar. Tente novamente.</Alert>}

                        <Form id="gm-form" ref={formRef} onSubmit={sendEmail}>
                            <Form.Group controlId="formName" className="mb-3">
                                <Form.Label className={style.label}>Nome</Form.Label>
                                <Form.Control type="text" name="name" required className={style.formControl} />
                            </Form.Group>

                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label className={style.label}>Email</Form.Label>
                                <Form.Control type="email" name="email" required className={style.formControl} />
                            </Form.Group>

                            <Form.Group controlId="formMessage" className="mb-4">
                                <Form.Label className={style.label}>Mensagem</Form.Label>
                                <Form.Control as="textarea" rows={4} name="message" required className={style.formControl} />
                            </Form.Group>

                            <div className="text-center">
                                <Button type="submit" className={style.button}>Enviar</Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}
