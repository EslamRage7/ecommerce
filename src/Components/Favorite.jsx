import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  deleteFromCart,
  updateQuantity,
} from "../Redux-tool-kit/slices/cart-slice";
import {
  deleteFromFavorite,
  clearFavorite,
} from "../Redux-tool-kit/slices/heart-slice";

import AOS from "aos";
import "aos/dist/aos.css";

import { Snackbar, Alert } from "@mui/material";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaRegHeart, FaStar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi";

function Favorite() {
  const heart = useSelector((state) => state.heart);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [add, setAdd] = useState(false);
  const [deleteCart, setDelete] = useState(false);

  const handleAddProduct = (product) => {
    dispatch(addToCart(product));
    setAdd(true);
  };
  const handleDeleteFromCart = (product) => {
    dispatch(deleteFromCart(product));
    setDelete(true);
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
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

      <div className="products">
        <div className="container-fluid mt-5 pb-5 mb-5">
          <h2 className="text-center mb-4 fw-bold" data-aos="fade-down">
            My Favorites {heart.length > 0 && `(${heart.length})`}
          </h2>

          {/* Back Button */}
          {heart.length > 0 && (
            <div
              className="d-flex flex-wrap gap-3 my-5 mb-5"
              data-aos="fade-up"
            >
              <Link
                to="/products"
                className="btn btn-filter d-inline-flex align-items-center gap-2 text-white"
              >
                <FaArrowLeft />
                Back to Products
              </Link>

              <Link
                to="/cart"
                className="btn btn-filter d-inline-flex align-items-center gap-2 text-white"
              >
                View Cart
                <FaArrowRight />
              </Link>

              <button
                className="btn btn-remove d-inline-flex align-items-center gap-2 text-white"
                onClick={() => dispatch(clearFavorite())}
              >
                <FaTrash />
                Clear All
              </button>
            </div>
          )}

          <div className="row">
            {heart.length > 0 ? (
              heart.map((product, index) => {
                const cartItem = cart.find((item) => item.id === product.id);
                return (
                  <div
                    key={product.id}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                    className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                  >
                    <div className="card h-100 p-3 d-flex flex-column">
                      <Link
                        to={`/${product.id}`}
                        className="text-decoration-none"
                      >
                        <div className="card-img text-center m-auto p-3">
                          <img
                            src={product.image}
                            className="card-img-top img-fluid"
                            alt={product.title}
                            loading="lazy"
                            style={{ maxHeight: "180px", objectFit: "contain" }}
                          />
                        </div>
                      </Link>

                      <div className="card-body d-flex flex-column">
                        <h6 className="card-title text-truncate">
                          {product.title}
                        </h6>

                        <div className="d-flex align-items-center gap-2 mb-2">
                          <FaStar className="text-warning" />
                          <span>{product.rating.rate}</span>
                          <span className="text-muted">
                            ({product.rating.count})
                          </span>
                        </div>

                        <p className="card-price fw-bold mb-2">
                          ${Math.ceil(product.price)}
                        </p>

                        {/* Quantity & Add/Remove */}
                        <div className="d-flex align-items-center gap-2 mt-auto">
                          <button
                            className="btn btn-outline-dark btn-sm"
                            disabled={!cartItem}
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  id: product.id,
                                  type: "decrease",
                                }),
                              )
                            }
                          >
                            -
                          </button>
                          <span>{cartItem ? cartItem.quantity : 1}</span>
                          <button
                            className="btn btn-outline-dark btn-sm"
                            disabled={!cartItem}
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  id: product.id,
                                  type: "increase",
                                }),
                              )
                            }
                          >
                            +
                          </button>

                          {cart.some((item) => item.id === product.id) ? (
                            <button
                              onClick={() => handleDeleteFromCart(product)}
                              className="btn btn-remove btn-sm fw-bold ms-auto d-flex align-items-center gap-1 text-white"
                            >
                              <FaTrash /> Remove
                            </button>
                          ) : (
                            <button
                              onClick={() => handleAddProduct(product)}
                              className="btn btn-add btn-sm fw-bold ms-auto d-flex align-items-center gap-1 text-white"
                            >
                              <HiShoppingCart /> Add
                            </button>
                          )}
                        </div>

                        {/* Heart */}
                        <button
                          onClick={() => dispatch(deleteFromFavorite(product))}
                          className="card-heart btn btn-remove rounded-circle fs-6 mt-2"
                        >
                          <FaRegHeart />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-12 text-center mt-5 " data-aos="fade-in">
                <p className="text-muted">
                  Add products to your favorites and they will appear here
                </p>
                <Link
                  to="/products"
                  className="btn btn-filter btn-continue d-inline-flex align-items-center gap-2 text-white"
                >
                  <FaArrowLeft />
                  Browse Products
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Favorite;
