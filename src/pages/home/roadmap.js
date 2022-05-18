import RoadmapCard from "../../components/RoadmapCard";
import Title from "../../components/Title";
import { ROADMAP_DATA } from "../../config/data";
import { Images_Src } from "../../config/images";

const RoadmapSection = () => {
  return (
    <div className="roadmap-section">
      <div className="content">
        <Title>{"Roadmap"}</Title>
        <div className="relative">
          {ROADMAP_DATA.map((data, index) => (
            <RoadmapCard
              index={data.index}
              title={data.title}
              text={data.text}
              badge={data.badge}
              key={index}
            />
          ))}
          <div className="v-line" />
        </div>
      </div>
      <div className="image">
        <img src={Images_Src.roadmap} alt="key" />
      </div>
    </div>
  );
};

export default RoadmapSection;
