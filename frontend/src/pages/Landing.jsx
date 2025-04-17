import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <>
      <Navbar />
      <div className="h-[68.5vh]">
        <img
          src="hero.webp"
          alt="hero"
          className="h-full w-full object-cover"
        />
      </div>
      <Footer />
    </>
  );
};

export default Landing;
