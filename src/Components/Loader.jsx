import { FaShoppingCart } from "react-icons/fa";

export default function Loader() {
  return (
    <div className="loader-container">
      <FaShoppingCart className="cart-icon" />
      <p className="fw-bold">Loading ...</p>
    </div>
  );
}
