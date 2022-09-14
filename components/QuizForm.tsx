import { useRouter } from "next/router";
import { NextPage } from "next";
import Quiz from "../types/Quiz";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useInsert, useUpdate } from "react-supabase";
import UserContext from "../lib/UserContext";

interface Props {
  quiz: Quiz;
}

const QuizForm: NextPage<Props> = ({ quiz }) => {
  const router = useRouter();
  const user = useContext(UserContext);
  const [question, setQuestion] = useState<string>(quiz.question);
  const [answer, setAnswer] = useState<string>(quiz.answer);
  const [_input, insertExecute] = useInsert("quizzes");
  const [_update, updateExecute] = useUpdate("quizzes");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (quiz.id) {
      const { count, data, error } = await updateExecute(
        { question: question, answer: answer },
        (query) => query.eq("id", quiz.id)
      );
    } else {
      const { count, data, error } = await insertExecute({
        question: question,
        answer: answer,
        quiz_set_id: quiz.quiz_set_id,
        user_id: user?.id,
      });
    }
    // TODO: error handling
    router.push(`/quiz_sets/${quiz.quiz_set_id}`);
  };

  const handleChangeAnswer = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(event.target.value);
  };

  const handleChangeQuestion = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(event.target.value);
  };

  return (
    <section>
      <h3 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        Quiz
      </h3>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="md:flex md:items-center mb-6">
          <div>
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Question
            </label>
          </div>
          <div>
            <textarea
              rows={4}
              placeholder="Question"
              required
              name="question"
              onChange={handleChangeQuestion}
              defaultValue={question}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div>
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Answer
            </label>
          </div>
          <div className="pr-8">
            <textarea
              rows={4}
              placeholder="Answer"
              required
              name="answer"
              onChange={handleChangeAnswer}
              defaultValue={answer}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
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
