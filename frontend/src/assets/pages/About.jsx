import { Container, Row, Col, Card } from "react-bootstrap";
import {
  Puzzle,
  Palette,
  Truck,
  ArrowReturnLeft,
} from "react-bootstrap-icons";

const APP_NAME = "Your App Name";

const features = [
  {
    icon: Puzzle,
    color: "#ff8a5c",
    title: "Safe & Quality Toys",
    text: "Every toy is picked with kids' safety and durability in mind, so playtime stays worry-free.",
  },
  {
    icon: Palette,
    color: "#6c8cff",
    title: "Cozy Room Decor",
    text: "From wall art to bedding and lighting, we help you turn a plain room into a place kids love.",
  },
  {
    icon: Truck,
    color: "#2ec4a6",
    title: "Fast Delivery",
    text: "Quick, careful shipping so your order reaches your doorstep in perfect condition.",
  },
  {
    icon: ArrowReturnLeft,
    color: "#f2b632",
    title: "Easy Returns",
    text: "Not the right fit? Our simple return process makes shopping stress-free.",
  },
];

function About() {
  return (
    <Container className="py-5">
      <section className="text-center bg-warning-subtle rounded-4 p-5 mb-5">
        <h1>About Us</h1>
        <p className="lead mb-0">
          Welcome to {APP_NAME}, your one-stop shop for kids' toys and room
          decor. We believe every child deserves a room full of imagination
          and joy.
        </p>
      </section>

      <section className="mb-5">
        <h2>Our Story</h2>
        <p>
          {APP_NAME} started with a simple idea: shopping for your little ones
          should be fun, easy, and trustworthy. We bring together playful toys
          and charming decor in one place, so parents can create spaces where
          kids can play, learn, and dream.
        </p>
      </section>

      <section className="mb-5">
        <h2 className="mb-4">Why Choose Us</h2>
        <Row xs={1} md={2} lg={4} className="g-4">
          {features.map(({ icon: Icon, color, title, text }) => (
            <Col key={title}>
              <Card className="h-100 text-center shadow-sm border-0">
                <Card.Body>
                  <Icon size={40} color={color} className="mb-3" />
                  <Card.Title>{title}</Card.Title>
                  <Card.Text>{text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <section>
        <h2>Our Mission</h2>
        <p>
          To make childhood brighter by offering thoughtfully chosen toys and
          decor that spark creativity, comfort, and happiness at home.
        </p>
      </section>
    </Container>
  );
}

export default About;