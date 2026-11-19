

// import Carousel from 'react-bootstrap/Carousel';

// import { Image } from "react-bootstrap";

// function HomeCarousel() {
//     return (
//         <Carousel>
//             <Carousel.Item>
//                 <Image className="w-100" src="/slides/slide1.jpg" alt=""></Image>
               
//             </Carousel.Item>
//             <Carousel.Item>
//                 <Image className="w-100" src="/slides/slide2.jpg" alt=""></Image>
               
//             </Carousel.Item>
//             <Carousel.Item>
//                 <Image className="w-100" src="/slides/slide3.png" alt=""></Image>
               
//             </Carousel.Item>
//         </Carousel>
//     );
// }
// export default HomeCarousel;
import Carousel from "react-bootstrap/Carousel";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./HomeCarousel.css";

const slides = [
  {
    src: "/slides/slide1.jpg",
    title: "Toys they'll actually play with",
    text: "Soft toys, kits and games picked for every age.",
  },
  {
    src: "/slides/slide2.jpg",
    title: "Make their room feel like theirs",
    text: "Bedsheets, seating and decor in colours kids love.",
  },
  {
    src: "/slides/slide3.png",
    title: "New arrivals every week",
    text: "Fresh picks for gifts, birthdays and everyday play.",
  },
];

const categories = [
  {
    title: "Toys",
    text: "Stuffed toys, activity kits and creative play.",
    bg: "#f4ece1",
  },
  {
    title: "Room Decor",
    text: "Bedding, bean bags and small touches for kids' rooms.",
    bg: "#e3edf0",
  },
];

function HomeCarousel() {
  return (
    <>
      <Carousel fade indicators controls interval={4500}>
        {slides.map((s) => (
          <Carousel.Item key={s.src}>
            <Image className="d-block w-100 hero-img" src={s.src} alt="" />
            <div className="hero-overlay" />
            <div className="hero-caption">
              <h1 className="hero-title">{s.title}</h1>
              <p className="hero-text">{s.text}</p>
              <Button as={Link} to="/products" variant="light" size="lg">
                Shop now
              </Button>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      <Container className="py-5">
        <h2 className="mb-4">Shop by category</h2>
        <Row className="g-4">
          {categories.map((c) => (
            <Col md={6} key={c.title}>
              <div
                className="category-tile rounded-3 p-4 p-md-5"
                style={{ background: c.bg }}
              >
                <h3>{c.title}</h3>
                <p className="mb-3">{c.text}</p>
                <Link to="/products" className="link-dark fw-semibold">
                  Browse {c.title.toLowerCase()} &rarr;
                </Link>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default HomeCarousel;