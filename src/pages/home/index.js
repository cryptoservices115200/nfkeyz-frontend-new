import { useState } from "react";
import NavBar from "../../components/NavBar";
import SocialIcons from "../../components/SocialIcons";
import { Images_Src } from "../../config/images";
import Carousel from "./carousel";
import CollectSection from "./collect";
import CommunitySection from "./community";
import FaqSection from "./faq";
import MintSection from "./mint";
import RoadmapSection from "./roadmap";
import WelcomeSection from "./welcome";

const Home = () => {
  const [user, setUser] = useState(null);
  return (
    <div className="page-home">
      <NavBar
        user={user}
        setUser={(val) => {
          setUser(val);
        }}
      />
      {/*<img className="blur" src={Images_Src.blur} alt="blur" />*/}
      <MintSection user={user} />
      <WelcomeSection />
      {/*<CollectSection />*/}
      {/*<RoadmapSection />*/}
      {/*<Carousel />*/}
      {/*<FaqSection />*/}
      {/*<CommunitySection />*/}
      {/*<SocialIcons className="text-center my-8" />*/}
    </div>
  );
};

export default Home;
