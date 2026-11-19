import { useState } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Badge,
    Modal,
    Form,
} from "react-bootstrap";
import {
    Envelope,
    Telephone,
    GeoAlt,
    PencilSquare,
} from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { editUser } from "../../redux/userSlice";

const schema = yup.object().shape({
    fullname: yup
        .string()
        .required("Please enter fullname")
        .min(2, "Fullname should contain min 2 characters")
        .max(50, "Fullname shouldn't exceed 50 characters"),
    email: yup
        .string()
        .required("Please enter email")
        .email("Enter a valid email"),
    phone: yup.string().matches(/^[0-9]{10}$/, {
        message: "Enter a 10 digit phone number",
        excludeEmptyString: true,
    }),
    address: yup.string(),
    password: yup.string(),
});

function Profile() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.userState);

    const [showEdit, setShowEdit] = useState(false);

    if (!user) {
        return (
            <Container className="py-5 text-center">
                <h4>Please log in to view your profile.</h4>
            </Container>
        );
    }

    const details = [
        { icon: Envelope, label: "Email", value: user.email },
        { icon: Telephone, label: "Phone", value: user.phone },
        { icon: GeoAlt, label: "Address", value: user.address },
    ];

    const handleSave = (values) => {
        const updated = {
            id: user.id,
            fullname: values.fullname,
            email: values.email,
            phone: values.phone,
            address: values.address,
        };


        if (values.password) {
            updated.password = values.password;
        }

        dispatch(editUser(updated));
        toast.success("Profile updated successfully!");
        setShowEdit(false);
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow-sm border-0 text-center">
                        <Card.Body className="p-4">
                            <div
                                className="rounded-circle bg-warning d-flex align-items-center justify-content-center mx-auto mb-3 fs-1 fw-bold"
                                style={{ width: 96, height: 96 }}
                            >
                                {user.fullname?.charAt(0).toUpperCase()}
                            </div>

                            <h3 className="mb-1">{user.fullname}</h3>
                            {user.role && (
                                <Badge
                                    bg="secondary"
                                    className="text-capitalize"
                                >
                                    {user.role}
                                </Badge>
                            )}

                            <hr className="my-4" />

                            <div className="text-start">
                                {details.map(({ icon: Icon, label, value }) => (
                                    <div
                                        key={label}
                                        className="d-flex align-items-center mb-3"
                                    >
                                        <Icon
                                            size={20}
                                            className="me-3 text-secondary"
                                        />
                                        <div>
                                            <small className="text-muted d-block">
                                                {label}
                                            </small>
                                            <span>
                                                {value || "Not added yet"}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Button
                                variant="warning"
                                className="mt-2 rounded-5 px-4"
                                onClick={() => setShowEdit(true)}
                            >
                                <PencilSquare className="me-2" />
                                Edit Profile
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            
            <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>

                <Formik
                    validationSchema={schema}
                    onSubmit={handleSave}
                    enableReinitialize
                    initialValues={{
                        fullname: user.fullname || "",
                        email: user.email || "",
                        phone: user.phone || "",
                        address: user.address || "",
                        password: "",
                    }}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        values,
                        touched,
                        errors,
                    }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Modal.Body>
                                {[
                                    {
                                        name: "fullname",
                                        label: "Full Name",
                                        type: "text",
                                    },
                                    {
                                        name: "email",
                                        label: "Email",
                                        type: "email",
                                    },
                                    {
                                        name: "phone",
                                        label: "Phone",
                                        type: "text",
                                    },
                                ].map((f) => (
                                    <Form.Group className="mb-3" key={f.name}>
                                        <Form.Label>{f.label}</Form.Label>
                                        <Form.Control
                                            type={f.type}
                                            name={f.name}
                                            value={values[f.name]}
                                            onChange={handleChange}
                                            isInvalid={
                                                touched[f.name] &&
                                                !!errors[f.name]
                                            }
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors[f.name]}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                ))}

                                <Form.Group className="mb-3">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="address"
                                        value={values.address}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="Leave blank to keep current password"
                                        value={values.password}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button
                                    variant="secondary"
                                    onClick={() => setShowEdit(false)}
                                >
                                    Cancel
                                </Button>
                                <Button variant="success" type="submit">
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </Container>
    );
}

export default Profile;