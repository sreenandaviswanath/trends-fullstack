import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./assets/components/Header";
import HomeCarousel from "./assets/components/HomeCarousel";
import Cards1 from "./assets/components/Cards1";
import Footer from "./assets/components/Footer";
import About from "./assets/pages/About";
import Contact from "./assets/pages/Contact";
import ProductDetails from "./assets/pages/ProductDetails";
import Login from "./assets/components/Login";
import Register from "./assets/components/Register";
import Profile from "./assets/components/Profile";
import AddProduct from "./admin/pages/AddProduct";
import ListProduct from "./admin/pages/ListProducts copy";
import Editproduct from "./admin/pages/EditProduct";
import ListUsers from "./admin/pages/ListUsers";
import Auth from "./assets/components/Auth";
import UnAuthorized from "./assets/components/unAuthorized";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./admin/pages/Cart";
import AdminDashboard from "./admin/pages/AdminDashboard";
import UserDashboard from "./admin/pages/UserDashboard";
import { useSelector } from "react-redux";

function App() {
    const cartItems = useSelector((state) => state.productState.cartItems);
    const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

    return (
        <BrowserRouter>
            <Header cartCount={cartCount} />

            <ToastContainer position="top-center" autoClose={1500} />

            <Routes>
                <Route path="/" element={<HomeCarousel />} />

                <Route path="/products" element={<Cards1 />} />

                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

                <Route path="/profile" element={<Profile />} />

                <Route path="/product/:id" element={<ProductDetails />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                    path="/unauthorized"
                    element={
                        <Auth>
                            <UnAuthorized />
                        </Auth>
                    }
                />

                <Route
                    path="/admin/add-product"
                    element={
                        <Auth requiredRole={["admin", "seller"]}>
                            <AddProduct />
                        </Auth>
                    }
                />

                <Route
                    path="/admin/list-product"
                    element={
                        <Auth requiredRole={["admin", "seller", "user"]}>
                            <ListProduct />
                        </Auth>
                    }
                />

                <Route path="/admin/edit-product/:id" element={<Editproduct />} />

                <Route
                    path="/admin/list-users"
                    element={
                        <Auth requiredRole={["admin"]}>
                            <ListUsers />
                        </Auth>
                    }
                />

                <Route path="/cart" element={<Cart />} />

                <Route
                    path="/dashboard"
                    element={
                        <Auth requiredRole={["user", "admin", "seller"]}>
                            <UserDashboard />
                        </Auth>
                    }
                />

                <Route
                    path="/admin/dashboard"
                    element={
                        <Auth requiredRole={["admin", "seller"]}>
                            <AdminDashboard />
                        </Auth>
                    }
                />
            </Routes>

            <Footer />
        </BrowserRouter>
    );
}

export default App;