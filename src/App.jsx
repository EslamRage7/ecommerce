import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Loader from "./Components/Loader";
import NavbarApp from "./Components/NavbarApp";
import Home from "./Components/Home";
import Cart from "./Components/Cart";
import Favorite from "./Components/Favorite";
import About from "./Components/About";
import Products from "./Components/Products";
import ProductDetails from "./Components/ProductDetails";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";

function App() {
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [routeLoading, setRouteLoading] = useState(false);
  useEffect(() => {
    setRouteLoading(true);

    const timer = setTimeout(() => {
      setRouteLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="App min-vh-100 d-flex flex-column">
      <NavbarApp />

      <div className="flex-grow-1 position-relative">
        {routeLoading && <Loader />}

        {!routeLoading && (
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/:productID" element={<ProductDetails />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;
