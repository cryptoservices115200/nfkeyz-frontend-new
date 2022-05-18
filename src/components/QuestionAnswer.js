import { useRef, useState } from "react";
import { Images_Src } from "../config/images";

const QuestionAnswer = ({ question, answer }) => {
  const [accordion, setAccordion] = useState(false);
  const answerRef = useRef(null);

  const handleAccordion = () => {
    if (!accordion) {
      answerRef.current.style.maxHeight = answerRef.current.scrollHeight + "px";
    } else {
      answerRef.current.style.maxHeight = null;
    }
    setAccordion(!accordion);
  };
  return (
    <div className="component-question-answer">
      <div className="question" onClick={handleAccordion}>
        <div>{question}</div>
        <img
          src={accordion ? Images_Src.icons.minus : Images_Src.icons.plus}
          alt="min-plus"
        />
      </div>
      <div className="answer" ref={answerRef}>
        <div
          dangerouslySetInnerHTML={{
            __html: answer,
          }}
        />
      </div>
    </div>
  );
};

export default QuestionAnswer;
