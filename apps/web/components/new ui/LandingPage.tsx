
import LNavbar from "@/components/new custom/LNavbar"
import Carousel from "@/components/new custom/Carousel";
import  Card  from "@/components/new custom/Card";
import Banner from "../new custom/Banner";
// import { Separator } from "@/components/ui/separator";

const LandingPage = () => {
  return(
    <div className="">
        <LNavbar />
        {/* <Separator/> */}
        <Carousel />
        <Card />
        <Banner />
        <Card />
        <Card />
    </div>
  )
};

export default LandingPage;