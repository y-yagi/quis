import { useRouter } from "next/router";
import { NextPage } from "next";
import Quiz from "../types/Quiz";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useInsert, useUpdate } from "react-supabase";
import UserContext from "../lib/UserContext";
import ErrorMessage from "./ErrorMessage";

interface Props {
  quiz: Quiz;
}

const QuizForm: NextPage<Props> = ({ quiz }) => {
  const router = useRouter();
  const user = useContext(UserContext);
  const [question, setQuestion] = useState<string>(quiz.question);
  const [answer, setAnswer] = useState<string>(quiz.answer);
  const [enabled, setEnabled] = useState<boolean>(quiz.enabled);
  const [errmsg, setErrmsg] = useState("");
  const [_input, insertExecute] = useInsert("quizzes");
  const [_update, updateExecute] = useUpdate("quizzes");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (quiz.id) {
      updateQuiz();
    } else {
      createQuiz();
    }
  };

  const createQuiz = async () => {
    const { error } = await insertExecute({
      question: question,
      answer: answer,
      enabled: enabled,
      quiz_set_id: quiz.quiz_set_id,
      user_id: user?.id,
    });
    if (error) {
      setErrmsg(error.message);
    } else {
      router.push(`/quiz_sets/${quiz.quiz_set_id}`);
    }
  };

  const updateQuiz = async () => {
    const { error } = await updateExecute(
      { question: question, answer: answer, enabled: enabled },
      (query) => query.eq("id", quiz.id).eq("user_id", user?.id)
    );
    if (error) {
      setErrmsg(error.message);
    } else {
      router.push(`/quiz_sets/${quiz.quiz_set_id}`);
    }
  };

  const handleChangeAnswer = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(event.target.value);
  };

  const handleChangeQuestion = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(event.target.value);
  };

  const handleChangeEnabled = (event: ChangeEvent<HTMLInputElement>) => {
    setEnabled(event.target.checked);
  };

  return (
    <section>
      <h3 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        Quiz
      </h3>
      <ErrorMessage message={errmsg} />
      <form onSubmit={handleSubmit} className="w-full divide-y">
        <label className="block">
          <span className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4">
            Question
          </span>
          <textarea
            rows={4}
            placeholder="Question"
            required
            name="question"
            onChange={handleChangeQuestion}
            defaultValue={question}
            className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline form-textarea"
          />
        </label>
        <label className="block">
          <span className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4">
            Answer
          </span>
          <div className="pr-8">
            <textarea
              rows={4}
              placeholder="Answer"
              required
              name="answer"
              onChange={handleChangeAnswer}
              defaultValue={answer}
              className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline form-textarea"
            />
          </div>
        </label>
        <div className="block">
          <input
            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="checkbox"
            onChange={handleChangeEnabled}
            checked={enabled}
            id="enabled"
          />
          <label
            className="form-check-label inline-block text-gray-800"
            htmlFor="enabled"
          >
            Enabled
          </label>
        </div>
        <div className="block">
          <div className="md:w-1/6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default QuizForm;
