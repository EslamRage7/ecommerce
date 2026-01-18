import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import { FaRegHeart, FaStar } from "react-icons/fa6";
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

function ProductDetails() {
  const { productID } = useParams();
  const [product, setProduct] = useState(null);
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

  if (!product) return <p className="text-center mt-5">Loading...</p>;

  const cartItem = cart.find((item) => item.id === product.id);
  return (
    <div className="container my-5 products">
      {/* Back Button */}
      <Link
        to="/products"
        data-aos="fade-right"
        className="btn btn-filter btn-continue d-inline-flex align-items-center gap-2 mb-5"
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
              className="card-img-top"
              alt={product.title}
            />

            {heart.some((item) => item.id === product.id) ? (
              <button
                onClick={() => dispatch(deleteFromFavorite(product))}
                className="card-heart btn btn-remove rounded-circle fs-5 position-absolute top-0 end-0 m-3"
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
                onClick={() => dispatch(deleteFromCart(product))}
                className="btn btn-remove fw-bold ms-auto"
              >
                Remove from Cart
              </button>
            ) : (
              <button
                onClick={() => dispatch(addToCart(product))}
                className="btn btn-add fw-bold ms-auto"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
