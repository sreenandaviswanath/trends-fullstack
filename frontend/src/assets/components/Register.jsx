import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link, useNavigate } from "react-router-dom";
import * as formik from 'formik';
import * as yup from 'yup';
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import instance from "../../axios/instance";

function Register() {
    const { Formik } = formik;
    const dispatch = useDispatch();
    const Navigate = useNavigate();

    const schema = yup.object().shape({
        fullname: yup.string().required("Please enter fullname")
            .min(2, "Fullname should contain min 2 charactres")
            .max(50, "Fullname shouldn't exceed 50 characters"),
        email: yup.string().required("Please enter email").email("Enter a valid email"),
        password: yup.string().required("Please enter password"),

    });
    const handleAddproduct = async (values) => {
        try {
            const { data } = await instance.post("/users/signup", values);
            toast.success(data?.message || "Registered successfully");
            Navigate("/login");
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        }
    };


    return (
        <Container>
            <Row >
                <Col>
                    <h2>User Register</h2>
                </Col>
            </Row>
            <Row md={4} className="m-3 justify-content-center">
                <Col>
                    <Formik
                        validationSchema={schema}
                        onSubmit={handleAddproduct}
                        initialValues={{
                            fullname: '',
                            email: '',
                            password: ''

                        }}
                    >
                        {({ handleSubmit, handleChange, values, touched, errors }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Row className="mt-2 mb-2">
                                    <Form.Group as={Col} controlId="validationCustom01">
                                        <Form.Label>FullName</Form.Label>
                                        <Form.Control

                                            type="fullname"
                                            placeholder="Fullname"
                                            name="fullname"
                                            onChange={handleChange}
                                            value={values.fullname}
                                            isValid={touched.fullname && !errors.fullname}
                                            isInvalid={touched.fullname && !!errors.fullname}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.fullname}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mt-2 mb-3">
                                    <Form.Group as={Col} controlId="validationCustom01">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control

                                            type="email"
                                            placeholder="Email"
                                            name="email"
                                            onChange={handleChange}
                                            value={values.email}
                                            isValid={touched.email && !errors.email}
                                            isInvalid={touched.email && !!errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className=" mb-3">
                                    <Form.Group as={Col} controlId="validationCustom05">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            onChange={handleChange}
                                            value={values.password}
                                            isValid={touched.password && !errors.password}
                                            isInvalid={touched.password && !!errors.password}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <div>
                                    <Button type="submit" variant="success">
                                        Register
                                    </Button>
                                </div>
                                <Link to="/register"> Already have an account? Login here! </Link>
                            </Form>
                        )}

                    </Formik>
                </Col>
            </Row>


        </Container>
    );
}

export default Register;