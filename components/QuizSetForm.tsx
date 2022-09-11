import { useRouter } from "next/router";
import { NextPage } from "next";
import QuizSet from "../types/QuizSet";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useInsert, useUpdate } from "react-supabase";
import UserContext from "../lib/UserContext";

interface Props {
  quizSet: QuizSet;
}

const QuisSetForm: NextPage<Props> = ({ quizSet }) => {
  const router = useRouter();
  const user = useContext(UserContext);
  const [name, setName] = useState<string>(quizSet.name);
  const [_input, insertExecute] = useInsert("quiz_sets");
  const [_update, updateExecute] = useUpdate("quiz_sets");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (quizSet.id) {
      const { count, data, error } = await updateExecute(
        { name: name },
        (query) => query.eq("id", quizSet.id)
      );
    } else {
      const { count, data, error } = await insertExecute({
        name: name,
        user_id: user?.id,
      });
    }
    // TODO: error handling
    router.push("/");
  };

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <section>
      <h3 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        QuisSet
      </h3>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              placeholder="name"
              required
              name="name"
              onChange={handleChangeName}
              defaultValue={name}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
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

export default QuisSetForm;
