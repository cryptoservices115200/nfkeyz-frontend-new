import { Images_Src } from "../../config/images";

const CollectSection = () => {
  return (
    <div className="collect-section">
      <div className="left">
        <img className="card-one" src={Images_Src.cards[0]} alt="key" />
        <img className="card-two" src={Images_Src.cards[1]} alt="key" />
      </div>
      <div className="right">
        {
          "Collect, trade, or hold your keyz for your VIP access, badge, and much more."
        }
      </div>
    </div>
  );
};

export default CollectSection;
