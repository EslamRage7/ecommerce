import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Redux-tool-kit/slices/products-slice";

import { FaStar, FaRegHeart } from "react-icons/fa6";
import { HiShoppingCart } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";

import AOS from "aos";
import "aos/dist/aos.css";

import { Snackbar, Alert } from "@mui/material";

import {
  addToCart,
  deleteFromCart,
  updateQuantity,
} from "../Redux-tool-kit/slices/cart-slice";
import {
  addFavorite,
  deleteFromFavorite,
} from "../Redux-tool-kit/slices/heart-slice";

function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const heart = useSelector((state) => state.heart);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [add, setAdd] = useState(false);
  const [deleteCart, setDelete] = useState(false);

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchCategory = product.category === category || category === "all";
    return matchCategory && matchSearch;
  });

  const skeletonArray = Array.from({ length: 8 });

  const handleAddProduct = (product) => {
    dispatch(addToCart(product));
    setAdd(true);
  };
  const handleDeleteFromCart = (product) => {
    dispatch(deleteFromCart(product));
    setDelete(true);
  };

  useEffect(() => {
    dispatch(fetchProducts());
    AOS.init({ duration: 1000, once: true });
  }, [dispatch]);

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
      <div className="products container-fluid" id="products">
        <h1 className="text-center my-5 fw-bold" data-aos="fade-down">
          Our Products
        </h1>

        <input
          type="search"
          className="form-control mb-4"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-aos="fade-right"
        />

        {products.length !== 0 && (
          <div className="d-flex flex-wrap gap-2 my-5" data-aos="fade-up">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`btn fw-semibold text-capitalize rounded-pill ${
                  cat === category ? "btn-filter" : "btn-filter-active"
                }`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className="row">
          {filteredProducts.map((product, index) => {
            const cartItem = cart.find((item) => item.id === product.id);
            return (
              <div
                key={product.id}
                className="col-lg-3 col-md-4 col-sm-6 mb-4"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="card p-3 h-100">
                  <Link to={`/${product.id}`}>
                    <div className="card-img text-center m-auto p-3">
                      <img
                        src={product.image}
                        alt={product.title}
                        style={{ maxHeight: "150px" }}
                      />
                    </div>
                  </Link>

                  <h6 className="card-title text-truncate">{product.title}</h6>

                  <div className="d-flex align-items-center gap-2 mb-2">
                    <FaStar className="text-warning" />
                    <span>{product.rating.rate}</span>
                    <span className="text-muted">({product.rating.count})</span>
                  </div>

                  <p className="fw-bold">${Math.ceil(product.price)}</p>

                  <div className="d-flex align-items-center gap-1 flex-wrap">
                    <button
                      className="btn btn-outline-dark btn-sm"
                      disabled={!cartItem}
                      onClick={() =>
                        dispatch(
                          updateQuantity({ id: product.id, type: "decrease" }),
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
                          updateQuantity({ id: product.id, type: "increase" }),
                        )
                      }
                    >
                      +
                    </button>

                    {cartItem ? (
                      <button
                        className="btn btn-remove  ms-auto d-flex align-items-center gap-1"
                        onClick={() => handleDeleteFromCart(product)}
                      >
                        <FaTrash /> Remove
                      </button>
                    ) : (
                      <button
                        className="btn btn-add  ms-auto d-flex align-items-center gap-1"
                        onClick={() => handleAddProduct(product)}
                      >
                        <HiShoppingCart /> Add
                      </button>
                    )}
                  </div>

                  <button
                    className={`card-heart btn rounded-circle mt-2 ${
                      heart.some((item) => item.id === product.id)
                        ? "btn-remove"
                        : "btn-light bg-white"
                    }`}
                    onClick={() =>
                      heart.some((item) => item.id === product.id)
                        ? dispatch(deleteFromFavorite(product))
                        : dispatch(addFavorite(product))
                    }
                  >
                    <FaRegHeart />
                  </button>
                </div>
              </div>
            );
          })}
          {products.length === 0 &&
            skeletonArray.map((_, index) => (
              <div
                key={index}
                className="col-lg-3 col-md-4 col-sm-6 my-lg-3 my-3"
              >
                <div className="card p-3" aria-hidden="true">
                  {/* Image */}
                  <div className="card-img text-center m-auto p-5">
                    <div
                      className="placeholder-glow"
                      style={{ height: "180px" }}
                    >
                      <span className="placeholder col-12 h-100 rounded"></span>
                    </div>
                  </div>

                  <div className="card-body">
                    {/* Title */}
                    <h6 className="placeholder-glow mb-3">
                      <span className="placeholder col-10"></span>
                    </h6>

                    {/* Rating */}
                    <div className="d-flex gap-3 mb-2 placeholder-glow">
                      <span className="placeholder col-2"></span>
                      <span className="placeholder col-3"></span>
                    </div>

                    {/* Price */}
                    <p className="placeholder-glow mb-3">
                      <span className="placeholder col-4"></span>
                    </p>

                    {/* Quantity */}
                    <div className="d-flex align-items-center gap-2 mb-3 placeholder-glow">
                      <span className="placeholder col-2"></span>
                      <span className="placeholder col-2"></span>
                      <span className="placeholder col-2"></span>
                    </div>

                    {/* Button */}
                    <div className="placeholder-glow">
                      <span className="placeholder col-12 btn"></span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {filteredProducts.length == 0 && products.length > 0 && (
            <h3 className="mt-5 text-center">No results</h3>
          )}
        </div>
      </div>
    </>
  );
}

export default Products;
