import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

function About() {
  useEffect(() => {
    AOS.init({ duration: 2000, once: false });
  }, []);

  return (
    <>
      <section className="about bg-light" data-aos="fade-up">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">About Our Store</h2>
            <p className="text-muted mt-3">
              Learn more about who we are and what makes us different
            </p>
          </div>

          <div className="row align-items-center">
            {/* Text */}
            <div className="col-md-6 mb-4 mb-md-0">
              <h3 className="fw-semibold mb-3">
                We Bring You the Latest Fashion Trends
              </h3>
              <p className="text-muted">
                We are a modern eCommerce store focused on delivering stylish,
                high-quality clothing and accessories for everyday life.
              </p>
              <p className="text-muted">
                Our mission is to help you look confident and feel comfortable
                with carefully selected products and affordable prices.
              </p>

              <button className="btn btn-dark mt-3">Learn More</button>
            </div>

            {/* Stats */}
            <div className="col-md-6">
              <div className="row text-center">
                <div className="col-6 mb-4">
                  <div className="p-4 border rounded">
                    <h4 className="fw-bold">5K+</h4>
                    <p className="text-muted mb-0">Happy Customers</p>
                  </div>
                </div>
                <div className="col-6 mb-4">
                  <div className="p-4 border rounded">
                    <h4 className="fw-bold">500+</h4>
                    <p className="text-muted mb-0">Products</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-4 border rounded">
                    <h4 className="fw-bold">24/7</h4>
                    <p className="text-muted mb-0">Support</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-4 border rounded">
                    <h4 className="fw-bold">Fast</h4>
                    <p className="text-muted mb-0">Delivery</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
