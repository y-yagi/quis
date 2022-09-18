import { useRouter } from "next/router";
import { NextPage } from "next";
import QuizSet from "../types/QuizSet";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useInsert, useUpdate } from "react-supabase";
import UserContext from "../lib/UserContext";
import ErrorMessage from "./ErrorMessage";

interface Props {
  quizSet: QuizSet;
}

const QuizSetForm: NextPage<Props> = ({ quizSet }) => {
  const router = useRouter();
  const user = useContext(UserContext);
  const [name, setName] = useState<string>(quizSet.name);
  const [errmsg, setErrmsg] = useState("");
  const [_input, insertExecute] = useInsert("quiz_sets");
  const [_update, updateExecute] = useUpdate("quiz_sets");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (quizSet.id) {
      updateQuizSet();
    } else {
      createQuizSet();
    }
  };

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const createQuizSet = async () => {
    const { error } = await insertExecute({
      name: name,
      user_id: user?.id,
    });

    if (error) {
      setErrmsg(error.message);
    } else {
      router.push("/");
    }
  };

  const updateQuizSet = async () => {
    const { error } = await updateExecute({ name: name }, (query) =>
      query.eq("id", quizSet.id).eq("user_id", user?.id)
    );

    if (error) {
      setErrmsg(error.message);
    } else {
      router.push("/");
    }
  };

  return (
    <section>
      <h3 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        QuizSet
      </h3>
      <ErrorMessage message={errmsg} />
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/6">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Name
            </label>
          </div>
          <div className="md:w-4/6 pr-8">
            <input
              placeholder="name"
              required
              name="name"
              onChange={handleChangeName}
              defaultValue={name}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
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

export default QuizSetForm;
