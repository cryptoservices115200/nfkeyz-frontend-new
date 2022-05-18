import Button from "../../components/Button";
import { Images_Src } from "../../config/images";

const CommunitySection = () => {
  return (
    <div className="community-section">
      <div className="card">
        <div className="w-full">
          <div className="title">{"Join Our Community"}</div>
          <div className="text">
            {"Download the CroGram app today."}
            <br />
            {"An app created for devs and investors in the crypto community."}
          </div>
          <div className="flex sm-wrap">
            <Button className="mr-4">{"View On Opensea"}</Button>
            <Button gradient>{"Download App"}</Button>
          </div>
        </div>
        <div className="image">
          <img src={Images_Src.community} alt="community" />
        </div>
      </div>
    </div>
  );
};

export default CommunitySection;
