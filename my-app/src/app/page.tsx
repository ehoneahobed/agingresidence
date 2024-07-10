import NavBar from "@/components/custom/NavBar";
import HeroBanner from "@/components/custom/HeroBanner";
import FeaturedCommunities from "@/components/custom/FeaturedCommunities";
import DiscoverCommunity from "@/components/custom/DiscoverCommunity";
import StatesList from "@/components/custom/StatesList";
import Newsletter from "@/components/custom/Newsletter";
import Footer from "@/components/custom/Footer";

export default function Home() {
  return (
    <main className="">
      <NavBar/>
      <HeroBanner/>
      <FeaturedCommunities/>
      <DiscoverCommunity/>
      <StatesList/>
      <Newsletter/>
      <Footer/>
    </main>
  );
}
