import Button from "../../components/Button";
import Title from "../../components/Title";
import { Images_Src } from "../../config/images";

const WelcomeSection = () => {
  return (
    <div className="welcome-section">
      <div className="left">
        <div className="sup-title">{"WELCOME TO NFKEYZ"}</div>
        <Title>{"The Official NFT’s For The CroGram App."}</Title>
        <div className="flex mt-8 sm-wrap">
          <Button className="mr-4">{"View On Opensea"}</Button>
          {/*<Button gradient>{"Mint Now"}</Button>*/}
        </div>
      </div>
      <div className="right">
        <img src={Images_Src.welcome} alt="key" />
      </div>
    </div>
  );
};

export default WelcomeSection;
