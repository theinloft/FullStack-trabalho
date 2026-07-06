import About from "../components/about/about";
import Carroussel from "../components/Carroussel/Carroussel";
import Service from "../components/services/service";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const id = location.state.scrollTo;
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      window.history.replaceState({}, document.title);
    }
  }, [location]);
  return (
    <>
      <Carroussel />
      <About />
      <Service />
    </>
  );
}

export default Home;
