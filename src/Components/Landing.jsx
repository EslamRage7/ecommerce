import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

function Landing() {
  useEffect(() => {
    AOS.init({ duration: 1500, once: true });
  }, []);
  return (
    <div className="landing">
      <div className="container-fluid d-flex justify-content-center align-items-center h-100">
        <div className="overlay">
          <div className="content text-white text-center" data-aos="fade-up">
            <h1 className="mb-3">Discover the Latest Fashion Trends</h1>
            <p>
              Upgrade your style with our exclusive collection of clothing and
              accessories made just for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Landing;
