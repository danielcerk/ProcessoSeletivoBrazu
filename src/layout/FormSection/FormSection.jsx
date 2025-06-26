import React, { useRef, useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";

import emailjs from "@emailjs/browser";

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
            })
            .catch(() => {
                setError(true);
                setSent(false);
            });
    }

    return (

        <section className="py-5 bg-white">

            <Container>

                <Row className="justify-content-center">

                    <Col md={8}>

                        <h2 className="text-center mb-4">Entre em Contato</h2>

                        {sent && <Alert variant="success">Mensagem enviada com sucesso!</Alert>}
                        {error && <Alert variant="danger">Erro ao enviar. Tente novamente.</Alert>}

                        <Form ref={formRef} onSubmit={sendEmail}>

                            <Form.Group controlId="formName" className="mb-3">

                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" name="name" required />

                            </Form.Group>

                            <Form.Group controlId="formEmail" className="mb-3">

                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" required />

                            </Form.Group>

                            <Form.Group controlId="formMessage" className="mb-3">

                                <Form.Label>Mensagem</Form.Label>
                                <Form.Control as="textarea" rows={4} name="message" required />

                            </Form.Group>

                            <div className="text-center">

                                <Button type="submit" variant="primary">Enviar</Button>

                            </div>

                        </Form>

                    </Col>

                </Row>

            </Container>

        </section>
    );
}
