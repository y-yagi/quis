import { NextPage } from "next";
import { useRef, useState } from "react";
import Quiz from "../types/Quiz";

interface Props {
  quiz: Quiz;
}

const TestForm: NextPage<Props> = ({ quiz }) => {
  const [yourAnswer, setYourAnswer] = useState("");
  const ansRef = useRef<HTMLParagraphElement>(null);

  const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYourAnswer(event.target.value);
  };

  const handleCheck = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    let msg = "Correct!";
    if (quiz.answer !== yourAnswer)
      msg = `Wrong! The answer is " ${quiz.answer} "`;
    if (ansRef && ansRef.current) ansRef.current.innerHTML = msg;
  };

  return (
    <div className="p-10 rounded-lg mx-auto">
      <div className="mb-5">
        <label className="block mb-2 font-bold text-gray-600">
          {quiz.question}
        </label>
        <input
          type="text"
          name="answer"
          placeholder="Put in your answer."
          className="border border-gray-300 shadow p-3 w-full rounded mb-"
          autoComplete="off"
          onChange={handleChangeAnswer}
        />
        <p className="text-red-400 mt-2" ref={ansRef} />
      </div>

      <div className="text-right">
        <button
          className="py-3 px-8 bg-green-500 text-green-100 font-bold rounded"
          onClick={handleCheck}
        >
          Check
        </button>
      </div>
    </div>
  );
};

export default TestForm;
