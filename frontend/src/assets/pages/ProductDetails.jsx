import { useParams } from "react-router-dom";
import { Button, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import instance from "../../axios/instance";

import { addToCart } from "../../redux/productSlice";

import "./ProductDetails.css";

function ProductDetails() {

    const { id } = useParams();
    const dispatch = useDispatch();
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

    const handleAddToCart = () => {
        if (!product) return;

        dispatch(
            addToCart({
                ...product,
                quantity: 1
            })
        );

        toast.success("Product added to cart!");
    };

    if (!product) {
        return (
            <h4 className="text-center mt-4">
                Loading...
            </h4>
        );
    }

    return (
        <div className="product-details-wrapper">

            <div className="product-image-container">
                <Image
                    src={product.productImage}
                    alt={product.productName}
                    className="product-details-image"
                />
            </div>

            <div className="product-details shadow-lg">

                <h2>{product.productName}</h2>

                <p className="product-description">
                    {product.productDescription}
                </p>

                <p className="product-price">
                    Price: {product.productPrice}
                </p>

                <Button
                    className="add-cart-btn"
                    onClick={handleAddToCart}
                >
                    Add Cart
                </Button>

            </div>

        </div>
    );
}

export default ProductDetails;