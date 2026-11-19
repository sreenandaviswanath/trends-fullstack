import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import {
    BoxSeam,
    People,
    PersonCheck,
    PlusCircle,
    ListUl,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminDashboard() {
    const { user, users } = useSelector((state) => state.userState);
    const { products } = useSelector((state) => state.productState);

    const isAdmin = user?.role === "admin";
    const activeUsers = users.filter((u) => u.status).length;
    const latestProducts = products.slice(-5).reverse();

    const stats = [
        {
            icon: BoxSeam,
            color: "#ff8a5c",
            label: "Total Products",
            value: products.length,
        },
        ...(isAdmin
            ? [
                  {
                      icon: People,
                      color: "#6c8cff",
                      label: "Total Users",
                      value: users.length,
                  },
                  {
                      icon: PersonCheck,
                      color: "#2ec4a6",
                      label: "Active Users",
                      value: activeUsers,
                  },
              ]
            : []),
    ];

    return (
        <Container className="py-5">
            <section className="bg-warning-subtle rounded-4 p-5 mb-5">
                <h1 className="mb-1">Admin Dashboard</h1>
                <p className="lead mb-0">
                    Welcome back, {user?.fullname}. Here's an overview of your
                    shop.
                </p>
            </section>

            {/* Stats */}
            <Row xs={1} md={3} className="g-4 mb-4">
                {stats.map(({ icon: Icon, color, label, value }) => (
                    <Col key={label}>
                        <Card className="shadow-sm border-0 h-100">
                            <Card.Body className="d-flex align-items-center">
                                <Icon size={38} color={color} className="me-3" />
                                <div>
                                    <div className="fs-2 fw-bold lh-1">
                                        {value}
                                    </div>
                                    <small className="text-muted">
                                        {label}
                                    </small>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Quick actions */}
            <div className="d-flex flex-wrap gap-2 mb-5">
                <Button
                    as={Link}
                    to="/admin/add-product"
                    variant="warning"
                    className="rounded-5 px-4"
                >
                    <PlusCircle className="me-2" />
                    Add Product
                </Button>

                <Button
                    as={Link}
                    to="/admin/list-product"
                    variant="outline-dark"
                    className="rounded-5 px-4"
                >
                    <ListUl className="me-2" />
                    List Products
                </Button>

                {isAdmin && (
                    <Button
                        as={Link}
                        to="/admin/list-users"
                        variant="outline-dark"
                        className="rounded-5 px-4"
                    >
                        <People className="me-2" />
                        List Users
                    </Button>
                )}
            </div>

            {/* Latest products */}
            <Card className="shadow-sm border-0">
                <Card.Body>
                    <h4 className="mb-3">Latest Products</h4>

                    {latestProducts.length === 0 ? (
                        <p className="text-muted mb-0">
                            No products yet. Add your first one!
                        </p>
                    ) : (
                        <Table responsive hover className="align-middle mb-0">
                            <thead>
                                <tr>
                                    <th>Photo</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {latestProducts.map((p) => (
                                    <tr key={p.id}>
                                        <td>
                                            <img
                                                src={p.productImage}
                                                alt={p.productName}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src =
                                                        "https://placehold.co/60x50?text=No+Image";
                                                }}
                                                style={{
                                                    width: 60,
                                                    height: 50,
                                                    objectFit: "cover",
                                                }}
                                                className="rounded"
                                            />
                                        </td>
                                        <td>{p.productName}</td>
                                        <td className="fw-bold">
                                            {p.productPrice}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default AdminDashboard;