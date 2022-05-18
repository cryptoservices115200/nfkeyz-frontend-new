import QuestionAnswer from "../../components/QuestionAnswer";
import Title from "../../components/Title";
import { FAQ_DATA } from "../../config/data";
import { Images_Src } from "../../config/images";

const FaqSection = () => {
  return (
    <div className="faq-section">
      <div className="image">
        <img src={Images_Src.faq} alt="key" />
      </div>
      <div className="flex-1">
        <Title>{"Key Facts"}</Title>
        <div className="description">
          {"Learn more about our NFKEYZ and the benefits they provide."}
        </div>
        <div>
          {FAQ_DATA.map((data, index) => (
            <QuestionAnswer
              question={data.question}
              answer={data.answer}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
