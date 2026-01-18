import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-dark text-lg-start text-md-start  text-center text-white  pt-5 pb-4">
      <div className="container">
        <div className="row">
          {/* Links */}
          <div className="col-lg-3 col-md-6 col-sm-6 col-12 mb-3">
            <h5 className="mb-3">Company</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-white text-decoration-none">
                  About Us
                </a>
              </li>
              <li>
                <a href="/" className="text-white text-decoration-none">
                  Careers
                </a>
              </li>
              <li>
                <a href="/" className="text-white text-decoration-none">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-6 col-12 mb-3">
            <h5 className="mb-3">Support</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-white text-decoration-none">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/" className="text-white text-decoration-none">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/" className="text-white text-decoration-none">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social Icons */}
          <div className="col-lg-3 col-md-6 col-sm-6 col-12 mb-3">
            <h5 className="mb-3">Follow Us</h5>
            <div className="d-flex gap-3 justify-content-lg-start justify-content-md-start justify-content-center">
              <a href="/" className="text-white fs-5">
                <FaFacebookF />
              </a>
              <a href="/" className="text-white fs-5">
                <FaTwitter />
              </a>
              <a href="/" className="text-white fs-5">
                <FaInstagram />
              </a>
              <a href="/" className="text-white fs-5">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-6 col-12 mb-3">
            <h5 className="mb-3">Contact</h5>
            <p>Email: support@shop.com</p>
            <p>Phone: +20 100 000 0000</p>
          </div>
        </div>
        <hr />

        <div className="text-center mt-4">
          &copy; {new Date().getFullYear()} Eslam Rageh. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
