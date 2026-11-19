import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate, useParams } from "react-router-dom";
import * as formik from "formik";
import * as yup from "yup";
import { Container } from "react-bootstrap";
import { editProduct } from "../../redux/productSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import instance from "../../axios/instance";

function EditProduct() {
    const { Formik } = formik;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const [product, setProduct] = useState(null);

    useEffect(() => {
        instance
            .get("/products/all")
            .then(({ data }) => {
                const found = data.products.find((p) => p._id === id);
                setProduct(found || null);
            })
            .catch((error) => console.log(error));
    }, [id]);

    const schema = yup.object().shape({
        productName: yup
            .string()
            .required("Please enter product name"),

        productPrice: yup
            .number()
            .required("Please enter product price"),

        productDescription: yup
            .string()
            .required("Please enter product description"),

        productPhoto: yup
            .string()
            .required("Please add product photo"),
    });
    const handleEdit = async (values) => {
        try {
            const { data } = await instance.put(`/products/${id}`, {
                productName: values.productName,
                productPrice: values.productPrice,
                productDescription: values.productDescription,
                productImage: values.productPhoto,
            });
            toast.success(data?.message || "Product updated successfully!");
            navigate("/admin/list-product");
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        }
    };

    if (!product) {
        return <h4 className="text-center mt-4">Loading...</h4>;
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h2 className="text-center mt-4">
                        Edit Product
                    </h2>
                </Col>
            </Row>

            <Row className="m-3 justify-content-center">
                <Col md={6}>

                    <Formik
                        validationSchema={schema}
                        onSubmit={handleEdit}
                        initialValues={{
                            productName: product.productName,
                            productPrice: product.productPrice,
                            productDescription:
                                product.productDescription,
                            productPhoto: product.productImage || "",
                        }}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            values,
                            touched,
                            errors,
                        }) => (

                            <Form
                                noValidate
                                onSubmit={handleSubmit}
                            >


                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Product Name
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        placeholder="Product Name"
                                        name="productName"
                                        onChange={handleChange}
                                        value={values.productName}
                                        isValid={
                                            touched.productName &&
                                            !errors.productName
                                        }
                                        isInvalid={
                                            touched.productName &&
                                            !!errors.productName
                                        }
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {errors.productName}
                                    </Form.Control.Feedback>
                                </Form.Group>



                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Product Price
                                    </Form.Label>

                                    <Form.Control
                                        type="number"
                                        placeholder="Product Price"
                                        name="productPrice"
                                        onChange={handleChange}
                                        value={values.productPrice}
                                        isValid={
                                            touched.productPrice &&
                                            !errors.productPrice
                                        }
                                        isInvalid={
                                            touched.productPrice &&
                                            !!errors.productPrice
                                        }
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {errors.productPrice}
                                    </Form.Control.Feedback>
                                </Form.Group>



                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Product Description
                                    </Form.Label>

                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        placeholder="Product Description"
                                        name="productDescription"
                                        onChange={handleChange}
                                        value={
                                            values.productDescription
                                        }
                                        isValid={
                                            touched.productDescription &&
                                            !errors.productDescription
                                        }
                                        isInvalid={
                                            touched.productDescription &&
                                            !!errors.productDescription
                                        }
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {errors.productDescription}
                                    </Form.Control.Feedback>
                                </Form.Group>



                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Product Photo
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        placeholder="Product Photo URL"
                                        name="productPhoto"
                                        onChange={handleChange}
                                        value={values.productPhoto}
                                        isValid={
                                            touched.productPhoto &&
                                            !errors.productPhoto
                                        }
                                        isInvalid={
                                            touched.productPhoto &&
                                            !!errors.productPhoto
                                        }
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {errors.productPhoto}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Button type="submit" variant="success">
                                    Edit Product
                                </Button>

                                <Button
                                    type="button"
                                    variant="secondary"
                                    className="ms-2"
                                    onClick={() =>
                                        navigate(
                                            "/admin/list-product"
                                        )
                                    }
                                >
                                    Cancel
                                </Button>

                            </Form>
                        )}
                    </Formik>

                </Col>
            </Row>
        </Container>
    );
}

export default EditProduct;