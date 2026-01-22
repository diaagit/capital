
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
        <MovieCarousel category="movie" variant="home" title="Trending Movies" />
        <CapitalBanner />
        <HomeCard />
        <Premier_Card />
        <MovieCarousel variant="home" title="Your Music Studio" category="concert" />
        <MovieCarousel variant="home" title="Festive Season" category="festival" genre="hip_hop" />
    </div>
  )
};

export default LandingPage;