import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

function Contact() {
  useEffect(() => {
    AOS.init({ duration: 2000, once: false });
  }, []);

  return (
    <>
      <section className="py-5 bg-light" data-aos="fade-up">
        <div className="container">
          {/* Title */}
          <div className="text-center mb-5">
            <h2 className="fw-bold">Contact Us</h2>
            <p className="text-muted">
              Have a question or need help? We’d love to hear from you.
            </p>
          </div>

          <div className="row align-items-center">
            {/* Contact Info */}
            <div className="col-md-5 mb-4 mb-md-0">
              <h5 className="fw-bold mb-3">Get in Touch</h5>
              <p className="text-muted">
                Feel free to contact us anytime. Our support team is always
                ready to help you.
              </p>

              <ul className="list-unstyled text-muted">
                <li className="mb-2">
                  📍 <strong>Address:</strong> Cairo, Egypt
                </li>
                <li className="mb-2">
                  📧 <strong>Email:</strong> support@shop.com
                </li>
                <li className="mb-2">
                  📞 <strong>Phone:</strong> +20 100 000 0000
                </li>
              </ul>
            </div>

            {/* Contact Form */}
            <div className="col-md-7">
              <div className="card shadow-sm p-4">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Your email"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Your message"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary fw-bold w-100"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
