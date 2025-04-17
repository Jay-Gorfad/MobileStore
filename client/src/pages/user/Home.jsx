import { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "../../components/user/ProductList"; // Assuming this component remains the same
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);

  // Fetch all banners
  const fetchBanners = async () => {
    try {
      const response = await axios.get("http://localhost:8000/banners");
      setBanners(response.data.filter(banner => banner.activeStatus)); // Only show active banners
    } catch (err) {
      console.error("Error fetching banners", err);
      toast.error("Failed to load banners");
    }
  };

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/products", {
        params: {
          isActive: true, // Filter only active products
        },
      });
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching products", err);
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    fetchBanners();
    fetchProducts();
  }, []);

  return (
    <div>
      <Carousel banners={banners} />
      <section className="mt-5 container">
        <div className="d-flex justify-content-between featured-products">
          <h4>All Products</h4>
        </div>
        <ProductList products={products} />
      </section>
    </div>
  );
};

const Carousel = ({ banners }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div id="carouselExampleIndicators" className="carousel slide">
      {/* Indicators */}
      <ol className="carousel-indicators">
        {banners.map((_, index) => (
          <li
            key={index}
            className={index === activeIndex ? "active" : ""}
            onClick={() => setActiveIndex(index)}
          ></li>
        ))}
      </ol>

      {/* Slides */}
      <div className="carousel-inner">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`carousel-item align-items-center ${index === activeIndex ? "active" : ""}`}
          >
            <img
              className="d-block w-100"
              src={`${banner.bannerImage}`}
              alt={`Banner ${index + 1}`}
              height={"420px"}
            />
            {index === 0 && (
              <div className="text-white carousel-caption d-md-block ">
                <div className="row align-items-center">
                  <div className="col-md-6 text-md-start text-center mb-5">
                    <span>Welcome to</span>
                    <h1>MobiTrendz</h1>
                    <p>
                      Get a 10% discount on the latest iPhone 14 series. Experience the innovation and style of the newest Apple technology.
                    </p>
                    <Link to="/shop" className="btn btn-primary">
                      Explore
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      {banners.length >= 2 && (
        <>
          <button className="carousel-control-prev" onClick={handlePrev}>
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button className="carousel-control-next" onClick={handleNext}>
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
