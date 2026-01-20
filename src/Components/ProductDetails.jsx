import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa";
import { FaRegHeart, FaStar, FaArrowRight } from "react-icons/fa6";
import { HiShoppingCart } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  deleteFromFavorite,
} from "../Redux-tool-kit/slices/heart-slice";
import {
  addToCart,
  deleteFromCart,
  updateQuantity,
} from "../Redux-tool-kit/slices/cart-slice";

import AOS from "aos";
import "aos/dist/aos.css";

import { Snackbar, Alert } from "@mui/material";

function ProductDetails() {
  const { productID } = useParams();
  const [product, setProduct] = useState(null);
  const [add, setAdd] = useState(false);
  const [deleteCart, setDelete] = useState(false);

  const heart = useSelector((state) => state.heart);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Fetch product
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${productID}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.log(err));

    AOS.init({ duration: 1200, once: true });
  }, [productID]);

  const handleAddProduct = (product) => {
    dispatch(addToCart(product));
    setAdd(true);
  };
  const handleDeleteFromCart = (product) => {
    dispatch(deleteFromCart(product));
    setDelete(true);
  };

  if (!product) return <p className="text-center mt-5">Loading...</p>;

  const cartItem = cart.find((item) => item.id === product.id);
  return (
    <>
      <Snackbar
        open={add}
        autoHideDuration={1000}
        onClose={() => setAdd(false)}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Product added to cart 🛒
        </Alert>
      </Snackbar>

      <Snackbar
        open={deleteCart}
        autoHideDuration={1000}
        onClose={() => setDelete(false)}
      >
        <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
          Product removed from cart ❌
        </Alert>
      </Snackbar>

      <div className="container my-5 products products-detailes">
        {/* Back Button */}
        <Link
          to="/products"
          data-aos="fade-right"
          className="btn btn-filter d-inline-flex align-items-center gap-2 mb-5 text-white"
        >
          <FaArrowLeft />
          Back to Products
        </Link>
        <div className="row">
          {/* Product Image */}
          <div className="col-md-6 text-center" data-aos="fade-right">
            <div className="card-img position-relative text-center m-auto p-5">
              <img
                style={{ maxHeight: "400px" }}
                src={product.image}
                loading="lazy"
                className="card-img-top"
                alt={product.title}
              />

              {heart.some((item) => item.id === product.id) ? (
                <button
                  onClick={() => dispatch(deleteFromFavorite(product))}
                  className="card-heart btn bg-remove text-white rounded-circle fs-5 position-absolute top-0 end-0 m-3"
                >
                  <FaRegHeart />
                </button>
              ) : (
                <button
                  onClick={() => dispatch(addFavorite(product))}
                  className="card-heart btn btn-light bg-white rounded-circle fs-5 position-absolute top-0 end-0 m-3"
                >
                  <FaRegHeart />
                </button>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="col-md-6" data-aos="fade-left">
            <h2 className="fw-bold">{product.title}</h2>
            <p className="text-muted">{product.description}</p>

            {/* Rating */}
            <div className="d-flex align-items-center gap-2 mb-3">
              <FaStar className="text-warning" />
              <span>{product.rating.rate}</span>
              <span className="text-muted">({product.rating.count} Units)</span>
            </div>

            {/* Price */}
            <p className="card-price mt-2 fw-bold fs-1">
              ${Math.ceil(product.price)}
            </p>

            {/* Handle Quantity */}

            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-outline-dark"
                disabled={!cartItem}
                onClick={() =>
                  dispatch(updateQuantity({ id: product.id, type: "decrease" }))
                }
              >
                -
              </button>
              <span>{cartItem ? cartItem.quantity : 1}</span>
              <button
                className="btn btn-outline-dark"
                disabled={!cartItem}
                onClick={() =>
                  dispatch(updateQuantity({ id: product.id, type: "increase" }))
                }
              >
                +
              </button>
              {/* Buttons */}
              {cart.some((item) => item.id === product.id) ? (
                <button
                  className="btn-remove btn ms-auto d-flex align-items-center gap-1 text-white"
                  onClick={() => handleDeleteFromCart(product)}
                >
                  <FaTrash /> Remove
                </button>
              ) : (
                <button
                  className="btn-add btn ms-auto d-flex align-items-center gap-1 text-white"
                  onClick={() => handleAddProduct(product)}
                >
                  <HiShoppingCart /> Add
                </button>
              )}

              <Link
                to="/cart"
                className="btn btn-filter d-inline-flex align-items-center gap-2 text-white"
              >
                View Cart
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
