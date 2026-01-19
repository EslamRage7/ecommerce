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

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/:productID" element={<ProductDetails />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
