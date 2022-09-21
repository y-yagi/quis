import { data } from "autoprefixer";
import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import Quiz from "../types/Quiz";

interface Props {
  quizzes: Quiz[];
}

const TestForm: NextPage<Props> = ({ quizzes }) => {
  const [quizIndex, setQuizIndex] = useState(0);
  const [curQuiz, setCurQuiz] = useState<Quiz>(quizzes[quizIndex]);
  const [yourAnswer, setYourAnswer] = useState("");
  const [answer, setAnswer] = useState("");
  const [quizFinished, setQuizFinished] = useState(false);

  const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYourAnswer(event.target.value);
  };

  const handleCheckAnswer = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    let msg = "Correct!";
    if (curQuiz.answer !== yourAnswer)
      msg = `Wrong! The answer is " ${curQuiz.answer} "`;

    setAnswer(msg);
    setQuizFinished(true);
  };

  const handleNextQuestion = () => {
    const nextQuizIndex = quizIndex + 1;
    setQuizFinished(false);
    setAnswer("");
    setYourAnswer("");
    setCurQuiz(quizzes[nextQuizIndex]);
    setQuizIndex(nextQuizIndex);
  };

  const showActionButton = () => {
    if (!quizFinished) {
      return (
        <button
          className="py-3 px-8 bg-green-500 text-green-100 font-bold rounded"
          onClick={handleCheckAnswer}
        >
          Check
        </button>
      );
    }

    if (quizIndex >= quizzes.length - 1) {
      return (
        <Link href="/">
          <button className="py-3 px-8 bg-blue-500 text-blue-100 font-bold rounded">
            Finish
          </button>
        </Link>
      );
    }

    return (
      <button
        className="py-3 px-8 bg-blue-500 text-blue-100 font-bold rounded"
        onClick={handleNextQuestion}
      >
        Next
      </button>
    );
  };

  return (
    <div className="p-10 rounded-lg mx-auto">
      <div className="mb-5">
        <label className="block mb-2 font-bold text-gray-600">
          {curQuiz.question}
        </label>
        <input
          type="text"
          name="answer"
          placeholder="Put in your answer."
          className="border border-gray-300 shadow p-3 w-full rounded mb-"
          autoComplete="off"
          onChange={handleChangeAnswer}
        />
        <p className="text-red-400 mt-2">{answer}</p>
      </div>

      <div className="text-right">{showActionButton()}</div>
    </div>
  );
};

export default TestForm;
