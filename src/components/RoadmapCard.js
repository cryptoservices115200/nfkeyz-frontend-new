const RoadmapCard = ({ index, title, text, badge }) => {
  return (
    <div className="component-roadmap-card">
      <span className="index">{index}</span>
      <div className="card">
        <div className="title">{title}</div>
        <div className="text">
          <div
            dangerouslySetInnerHTML={{
              __html: text,
            }}
          />
        </div>
        <div className="badge">{badge}</div>
      </div>
    </div>
  );
};

export default RoadmapCard;
