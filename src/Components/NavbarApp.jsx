import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.png";

import { IoCartOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";

function NavbarApp() {
  const cart = useSelector((state) => state.cart);
  const heart = useSelector((state) => state.heart);

  return (
    <>
      <nav className="navbar nav-top p-0 sticky-top bg-white ">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between w-100">
            {/* Logo */}
            <NavLink className="navbar-brand" to="/">
              <img
                src={logo}
                className="img-fluid logo"
                loading="lazy"
                alt="logo"
              />
            </NavLink>

            {/* Main Links */}
            <ul className="navbar-nav d-flex flex-row gap-5 bg-light px-5 rounded">
              <li className="nav-item active">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link nav-link-custom ${isActive ? "active" : ""}`
                  }
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item active">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link nav-link-custom ${isActive ? "active" : ""}`
                  }
                  to="/about"
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link nav-link-custom ${isActive ? "active" : ""}`
                  }
                  to="/products"
                >
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link nav-link-custom ${isActive ? "active" : ""}`
                  }
                  to="/contact"
                >
                  Contact
                </NavLink>
              </li>
            </ul>

            {/* Right Side Links */}
            <ul className="navbar-nav d-flex flex-row gap-3">
              <li className="nav-item position-relative bg-light border-0 p-1 rounded-circle btn">
                <NavLink
                  className="btn position-relative p-1 border-0"
                  to="/cart"
                >
                  <IoCartOutline className="fs-4" />
                  {cart.length > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle p-1 btn-remove border border-light rounded-circle text-white d-flex align-items-center justify-content-center"
                      style={{
                        width: "20px",
                        height: "20px",
                        fontSize: "10px",
                      }}
                    >
                      {cart.length}
                    </span>
                  )}
                </NavLink>
              </li>

              <li
                className={`nav-item  rounded-circle btn  border-0
                  ${heart.length > 0 ? "btn-remove" : "bg-light"}`}
              >
                <NavLink to="/favorite" className="btn p-1 border-0">
                  <FaRegHeart
                    style={{
                      width: "20px",
                      height: "20px",
                      fontSize: "10px",
                    }}
                    className={`fs-4 ${
                      heart.length > 0 ? "text-white" : "text-black"
                    }`}
                  />
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <nav className="navbar nav-right bg-white p-0 sticky-top">
        <div className="container-fluid">
          {/* Logo */}
          <NavLink className="navbar-brand" to="/">
            <img
              src={logo}
              className="img-fluid logo"
              loading="lazy"
              alt="logo"
            />
          </NavLink>
          <button
            className="navbar-toggler btn-sm btn"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon btn-sm btn"></span>
          </button>
          <div
            className="offcanvas offcanvas-end w-75"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header border-0">
              <ul className="navbar-nav d-flex flex-row gap-3">
                <li className="nav-item position-relative bg-light p-1 rounded-circle btn border-0">
                  <NavLink
                    className="btn position-relative p-2 border-0"
                    to="/cart"
                  >
                    <IoCartOutline className="fs-4" />
                    {cart.length > 0 && (
                      <span
                        className="position-absolute top-0 start-100 translate-middle p-2 btn-remove border border-light rounded-circle text-white d-flex align-items-center justify-content-center"
                        style={{
                          width: "20px",
                          height: "20px",
                          fontSize: "10px",
                        }}
                      >
                        {cart.length}
                      </span>
                    )}
                  </NavLink>
                </li>

                <li
                  className={`nav-item  rounded-circle btn border-0 
                  ${heart.length > 0 ? "btn-remove" : "bg-light"}`}
                >
                  <NavLink to="/favorite" className="btn p-1 border-0">
                    <FaRegHeart
                      style={{
                        width: "20px",
                        height: "20px",
                        fontSize: "10px",
                      }}
                      className={`fs-4 border-0 ${
                        heart.length > 0 ? "text-white" : "text-black"
                      }`}
                    />
                  </NavLink>
                </li>
              </ul>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item ">
                  <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                      `nav-link nav-link-custom ${isActive ? "active" : ""}`
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link nav-link-custom ${isActive ? "active" : ""}`
                    }
                    to="/about"
                  >
                    About
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/products"
                    className={({ isActive }) =>
                      `nav-link nav-link-custom ${isActive ? "active" : ""}`
                    }
                  >
                    Products
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      `nav-link nav-link-custom ${isActive ? "active" : ""}`
                    }
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
export default NavbarApp;
