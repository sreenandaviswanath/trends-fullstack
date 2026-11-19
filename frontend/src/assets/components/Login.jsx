import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import instance from "../../axios/instance";

import { useDispatch, useSelector } from "react-redux";

import { Link, Navigate, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { userLogin } from "../../redux/userSlice";


function Login() {

    const { isAuthenticated, users } = useSelector(
        (state) => state.userState
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [loginData, setLogindata] = useState({
        email: "",
        password: "",
    });
    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }
   const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.stopPropagation();
        setValidated(true);
        return;
    }
    try {
        const { data } = await instance.post("/users/login", loginData);

        dispatch(userLogin(data.user));

        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("isAuthenticated", JSON.stringify(true));

        toast.success(data.message);
        navigate("/");
    } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
    }
};

    const handleChange = (event) => {

        const fieldName = event.target.name;
        const fieldValue = event.target.value;

        setLogindata((prev) => ({
            ...prev,
            [fieldName]: fieldValue,
        }));
    };


    return (
        <Row md={4} className="m-3 justify-content-center">

            <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
            >

                <h2>Login Page</h2>


                

                <Row className="mt-5 mb-3">

                    <Form.Group
                        as={Col}
                        controlId="validationCustom01"
                    >

                        <Form.Label>
                            Email
                        </Form.Label>

                        <Form.Control
                            required
                            type="email"
                            placeholder="email"
                            name="email"
                            value={loginData.email}
                            onChange={handleChange}
                        />

                        <Form.Control.Feedback>
                            Looks good!
                        </Form.Control.Feedback>

                        <Form.Control.Feedback type="invalid">
                            Please enter a valid email.
                        </Form.Control.Feedback>

                    </Form.Group>

                </Row>


               

                <Row className="mb-3">

                    <Form.Group
                        as={Col}
                        controlId="validationCustom05"
                    >

                        <Form.Label>
                            Password
                        </Form.Label>

                        <Form.Control
                            type="password"
                            placeholder="Password"
                            required
                            name="password"
                            value={loginData.password}
                            onChange={handleChange}
                        />

                        <Form.Control.Feedback type="invalid">
                            Please provide a password.
                        </Form.Control.Feedback>

                    </Form.Group>

                </Row>


            

                <Form.Group className="mb-3">

                    <Form.Check
                        label="Remember"
                    />

                </Form.Group>


                

                <div>

                    <Button
                        type="submit"
                        variant="success"
                    >
                        Login
                    </Button>

                </div>


                <Link to="/register">
                    If you don't have an account Signup here!
                </Link>

            </Form>

        </Row>
    );
}

export default Login;