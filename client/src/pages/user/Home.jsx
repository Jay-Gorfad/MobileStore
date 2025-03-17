import { Link } from "react-router-dom";
import ProductList from "../../components/user/ProductList";
import { useState } from "react";

const Home = () => {
  return (
    <div>
        <Carousel/>
        <section className=" mt-5 container">
            <div className="d-flex justify-content-between featured-products">
                <h4>Trending products</h4>
            </div>
            <ProductList />
            <div className="d-flex justify-content-between featured-products">
                <h4>Featured products</h4>
            </div>
            <ProductList />
        </section>
    </div>
  )
}

const Carousel = () => {
    const banners = [
        { id: 1, image: "/67109e83e4596hero.png" },
        { id: 2, image: "banner.png" },
        { id: 3, image: "banner.png" }
    ];

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
                    <div key={banner.id} className={`carousel-item ${index === activeIndex ? "active" : ""}`}>
                        <img className="d-block w-100" src={`/img/banners/${banner.image}`} alt={`Banner ${index + 1}`} />
                        {index === 0 && (
                            <div className="text-white carousel-caption h-100 flex justify-content-center align-items-center d-md-block">
                                <div className="row align-items-center flex h-100">
                                    <div className="hero-content col-md-6 order-md-1 order-2 text-center text-md-start text-wrap justify-content-center text-black">
                                        <span>Welcome to</span>
                                        <h1 className="text-black">MobiTrendz</h1>
                                        <p className="text-white">
                                        Get a 10% discount on the latest iPhone 14 series. Experience the innovation and style of the newest Apple technology.</p>
                                        <Link to="/shop" className="btn btn-primary text-center align-self-sm-center align-self-md-start">Explore</Link>
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


  
export default Home