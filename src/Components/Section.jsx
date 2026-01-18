import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

function Section() {
  useEffect(() => {
    AOS.init({ duration: 2000, once: false });
  }, []);

  return (
    <section className="py-5 bg-light" data-aos="fade-up">
      <div className="container">
        <div className="row text-center mb-4">
          <h2 className="fw-bold">Why Shop With Us?</h2>
          <p className="text-muted">
            We provide the best shopping experience with quality products and
            fast service.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="p-4 bg-white shadow-sm rounded text-center h-100">
              <h5 className="fw-bold mb-2">Premium Quality</h5>
              <p className="text-muted mb-0">
                Carefully selected products made with the highest quality
                standards.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 bg-white shadow-sm rounded text-center h-100">
              <h5 className="fw-bold mb-2">Fast Delivery</h5>
              <p className="text-muted mb-0">
                Get your orders delivered quickly and safely to your doorstep.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 bg-white shadow-sm rounded text-center h-100">
              <h5 className="fw-bold mb-2">Best Prices</h5>
              <p className="text-muted mb-0">
                Competitive prices with great deals and special offers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Section;
