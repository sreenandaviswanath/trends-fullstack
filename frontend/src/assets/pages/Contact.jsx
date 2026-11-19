import { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import {
  GeoAlt,
  Telephone,
  Envelope,
  Clock,
  Send,
} from "react-bootstrap-icons";

const contactInfo = [
  {
    icon: GeoAlt,
    color: "#ff8a5c",
    title: "Visit Us",
    text: "123 Toy Street, Calicut City, Kerala, India",
  },
  {
    icon: Telephone,
    color: "#6c8cff",
    title: "Call Us",
    text: "+91 123-456-7890",
  },
  {
    icon: Envelope,
    color: "#2ec4a6",
    title: "Email Us",
    text: "info@trends.com",
  },
  {
    icon: Clock,
    color: "#f2b632",
    title: "Working Hours",
    text: "We work 24/7 to serve you better. Reach out anytime!",
  },
];

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log(formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Container className="py-5">
      <section className="text-center bg-warning-subtle rounded-4 p-5 mb-5">
        <h1>Contact Us</h1>
        <p className="lead mb-0">
          Questions about an order, a toy, or room decor? We'd love to hear
          from you.
        </p>
      </section>

      <Row xs={1} md={2} lg={4} className="g-4 mb-5">
        {contactInfo.map(({ icon: Icon, color, title, text }) => (
          <Col key={title}>
            <Card className="h-100 text-center shadow-sm border-0">
              <Card.Body>
                <Icon size={36} color={color} className="mb-3" />
                <Card.Title>{title}</Card.Title>
                <Card.Text>{text}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
              <h2 className="mb-4">Send us a message</h2>

              {submitted && (
                <Alert
                  variant="success"
                  dismissible
                  onClose={() => setSubmitted(false)}
                >
                  Thank you! Your message has been sent. We'll get back to you
                  soon.
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group controlId="contactName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="contactEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group controlId="contactSubject">
                      <Form.Label>Subject</Form.Label>
                      <Form.Control
                        type="text"
                        name="subject"
                        placeholder="How can we help?"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group controlId="contactMessage">
                      <Form.Label>Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="message"
                        placeholder="Write your message here..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Button variant="warning" type="submit">
                      <Send className="me-2" />
                      Send Message
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;