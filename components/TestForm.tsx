import { NextPage } from "next";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import Quiz from "../types/Quiz";

interface Props {
  quizzes: Quiz[];
}

const ResultType = {
  Undefined: "undfined",
  Correct: "correct",
  Wrong: "wrong",
} as const;
type ResulType = typeof ResultType[keyof typeof ResultType];

const TestForm: NextPage<Props> = ({ quizzes }) => {
  const [quizIndex, setQuizIndex] = useState(0);
  const [curQuiz, setCurQuiz] = useState<Quiz>(quizzes[quizIndex]);
  const [yourAnswer, setYourAnswer] = useState("");
  const [result, setResult] = useState<ResulType>(ResultType.Undefined);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleChangeAnswer = (event: ChangeEvent<HTMLInputElement>) => {
    setYourAnswer(event.target.value);
  };

  const handleCheckAnswer = () => {
    if (curQuiz.answer !== yourAnswer) setResult(ResultType.Wrong);
    else setResult(ResultType.Correct);

    setQuizFinished(true);
  };

  const handleNextQuestion = () => {
    const nextQuizIndex = quizIndex + 1;
    setQuizFinished(false);
    setResult(ResultType.Undefined);
    setYourAnswer("");
    setCurQuiz(quizzes[nextQuizIndex]);
    setQuizIndex(nextQuizIndex);
  };

  const handleRetry = () => {
    setQuizFinished(false);
    setResult(ResultType.Undefined);
    setYourAnswer("");
  };

  const showActionButton = () => {
    if (!quizFinished) {
      return (
        <button
          className="py-3 px-8 bg-green-500 text-green-100 font-bold rounded"
          onClick={() => handleCheckAnswer()}
        >
          Check
        </button>
      );
    }

    if (quizIndex >= quizzes.length - 1) {
      return (
        <div>
          <button
            className="py-3 px-8 bg-blue-500 text-blue-100 font-bold rounded mr-5"
            onClick={handleRetry}
          >
            Retry
          </button>
          <Link href="/">
            <button className="py-3 px-8 bg-blue-500 text-blue-100 font-bold rounded">
              Finish
            </button>
          </Link>
        </div>
      );
    }

    return (
      <div>
        <button
          className="py-3 px-8 bg-blue-500 text-blue-100 font-bold rounded mr-5"
          onClick={handleRetry}
        >
          Retry
        </button>
        <button
          className="py-3 px-8 bg-blue-500 text-blue-100 font-bold rounded"
          onClick={handleNextQuestion}
        >
          Next
        </button>
      </div>
    );
  };

  const showAnswer = () => {
    if (result === ResultType.Undefined) {
      return <span />;
    }

    if (result === ResultType.Correct) {
      return <p className="text-red-400 mt-2">Correct!</p>;
    }

    return (
      <p className="text-red-400 mt-2" data-testid="show-answer">
        Wrong! The answer is &quot;{" "}
        <span className="font-bold">{curQuiz.answer}</span> &quot;
      </p>
    );
  };

  return (
    <div className="p-10 rounded-lg mx-auto">
      <div className="text-center font-bold">{`${quizIndex + 1}/${
        quizzes.length
      }`}</div>
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
          value={yourAnswer}
          onChange={handleChangeAnswer}
        />
        {showAnswer()}
      </div>

      <div className="text-right">
        <div>{showActionButton()}</div>
      </div>
    </div>
  );
};

export default TestForm;
