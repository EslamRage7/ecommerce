import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  deleteFromCart,
  updateQuantity,
} from "../Redux-tool-kit/slices/cart-slice";
import { FaShoppingBag, FaTrash } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalPrice = cart.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <>
      <div className="container-fluid pb-5 mb-5 d-flex flex-column ">
        <div className="content flex-grow-1">
          <h2 className="text-center my-4 fw-bold" data-aos="fade-down">
            My Products
          </h2>

          {cart.length === 0 ? (
            <div className="text-center mt-5 pt-5" data-aos="fade-up">
              <h4 className="fw-bold">Your cart is empty 🛒</h4>
              <p className="text-muted">Add some products to see them here.</p>

              <Link
                to="/products"
                className="btn btn-filter mt-3 d-inline-flex align-items-center gap-2 mx-auto text-white"
              >
                <FaShoppingBag /> Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              {/* Total Price */}
              <div className="mb-4" data-aos="fade-up">
                <div className="d-flex justify-content-center align-items-center mb-4">
                  <div className="total-price">
                    <span className="fs-4">💰</span>
                    <span>Total: ${Math.ceil(totalPrice)}</span>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div
                className="d-flex flex-wrap align-items-center justify-content-start gap-3 my-5"
                data-aos="fade-up"
              >
                <Link
                  to="/products"
                  className="btn btn-filter fw-bolder d-flex align-items-center justify-content-center gap-2 text-white"
                >
                  <FaShoppingBag /> Continue Shopping
                </Link>
                <button
                  onClick={() => dispatch(clearCart())}
                  className="btn btn-remove fw-bolder d-flex align-items-center justify-content-center gap-2 text-white"
                >
                  <FaTrash /> Clear Cart
                </button>
              </div>

              {/* Table */}
              <div className="table-responsive" data-aos="fade-up">
                <table className="table table-hover border mb-5">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Title</th>
                      <th scope="col">Image</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item, index) => (
                      <tr key={item.id} data-aos-delay={index * 100}>
                        <th scope="row">{index + 1}</th>
                        <td>
                          <Link
                            style={{ textDecoration: "none", color: "black" }}
                            to={`/${item.id}`}
                          >
                            {item.title}
                          </Link>
                        </td>
                        <td>
                          <Link to={`/${item.id}`}>
                            <img
                              src={item.image}
                              style={{ width: "50px", height: "50px" }}
                              className="img-fluid"
                              alt={item.title}
                            />
                          </Link>
                        </td>
                        <td className="fw-bold">${Math.ceil(item.price)}</td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <button
                              className="btn btn-outline-dark btn-sm"
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    id: item.id,
                                    type: "decrease",
                                  }),
                                )
                              }
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              className="btn btn-outline-dark btn-sm"
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    id: item.id,
                                    type: "increase",
                                  }),
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>
                          <button
                            onClick={() => dispatch(deleteFromCart(item))}
                            className="btn btn-sm btn-remove d-flex align-items-center gap-2 text-white"
                          >
                            <FaTrash /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;
