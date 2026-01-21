
import LNavbar from "@/components/new custom/LNavbar"
import Carousel from "@/components/new custom/Carousel";
import MovieCarousel from "@/components/new custom/EventCard";
import CapitalBanner from "../new custom/HomePageBanner";
import HomeCard from "../new custom/HomeCard";
import Premier_Card from "../new custom/Premier_Card";

const LandingPage = () => {
  return(
    <div className="min-h-full min-w-full">
        <LNavbar type="home" />
        <Carousel />
        <MovieCarousel variant="home" title="Trending Movies" />
        <CapitalBanner />
        <HomeCard />
        <Premier_Card />
        <MovieCarousel variant="home" title="Your Music Studio" />
    </div>
  )
};

export default LandingPage;