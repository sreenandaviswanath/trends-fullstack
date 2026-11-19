import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Cart3, Person, ShopWindow } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function UserDashboard() {
    const { user } = useSelector((state) => state.userState);
    const { cartItems } = useSelector((state) => state.productState);

    const itemCount = cartItems.reduce(
        (sum, item) => sum + (item.quantity || 1),
        0
    );

    const cartTotal = cartItems.reduce(
        (sum, item) =>
            sum + Number(item.productPrice) * (item.quantity || 1),
        0
    );

    const cards = [
        {
            icon: ShopWindow,
            color: "#ff8a5c",
            title: "Shop",
            text: "Browse toys and room decor.",
            to: "/products",
            label: "Continue shopping",
        },
        {
            icon: Cart3,
            color: "#6c8cff",
            title: "My Cart",
            text:
                itemCount > 0
                    ? `${itemCount} item(s), total ${cartTotal.toLocaleString()}`
                    : "Your cart is empty.",
            to: "/cart",
            label: "View cart",
        },
        {
            icon: Person,
            color: "#2ec4a6",
            title: "My Profile",
            text: "View or edit your details.",
            to: "/profile",
            label: "View profile",
        },
    ];

    return (
        <Container className="py-5">
            <section className="bg-warning-subtle rounded-4 p-5 mb-5">
                <h1 className="mb-1">Welcome, {user?.fullname}!</h1>
                <p className="lead mb-0">
                    Here's a quick look at your account.
                </p>
            </section>

            <Row xs={1} md={3} className="g-4">
                {cards.map(({ icon: Icon, color, title, text, to, label }) => (
                    <Col key={title}>
                        <Card className="h-100 text-center shadow-sm border-0">
                            <Card.Body className="d-flex flex-column align-items-center">
                                <Icon size={40} color={color} className="mb-3" />
                                <Card.Title>{title}</Card.Title>
                                <Card.Text>{text}</Card.Text>
                                <Button
                                    as={Link}
                                    to={to}
                                    variant="outline-dark"
                                    className="mt-auto rounded-5 px-4"
                                >
                                    {label}
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default UserDashboard;