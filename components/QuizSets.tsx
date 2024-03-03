import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useDelete, useFilter, useSelect } from "react-supabase";
import UserContext from "../lib/UserContext";
import ErrorMessage from "./ErrorMessage";

const QuizSets = () => {
  const router = useRouter();
  const user = useContext(UserContext);
  const [errmsg, setErrmsg] = useState("");

  const filter = useFilter(
    (query) => query.eq("user_id", user?.id),
    [user?.id],
  );

  const [{ data, error, fetching }, _reexecute] = useSelect("quiz_sets", {
    filter,
  });
  const [_, execute] = useDelete("quiz_sets");

  const handleDestroy = async (id: string) => {
    const { error } = await execute((query) =>
      query.eq("id", id).eq("user_id", user?.id).order("created_at"),
    );

    if (error) {
      setErrmsg(error.message);
    } else {
      router.reload();
    }
  };

  if (error) return <div>{error.message}</div>;
  if (fetching) return <div>Loading...</div>;

  return (
    <section>
      <div>
        <p className="mb-8 md:text-5xl underline tracking-tighter m-5">
          <Link href="/quiz_sets/new">
            <a>Create a new Quiz Sets</a>
          </Link>
        </p>
      </div>
      <div className="grid">
        <ErrorMessage message={errmsg} />
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((quizSet) => (
              <tr key={quizSet.id} className="border">
                <td className="px-4 py-2">
                  <span className="text-blue-900">{quizSet.name}</span>
                </td>
                <td className="px-4 py-2">
                  <Link
                    href={`/test?quiz_set_id=${quizSet.id}&quiz_set_name=${quizSet.name}`}
                  >
                    <button className="btn btn-green">Test</button>
                  </Link>
                </td>
                <td className="px-4 py-2">
                  <Link href={`/quiz_sets/${quizSet.id}`}>
                    <button className="btn btn-blue">Edit</button>
                  </Link>
                </td>
                <td className="px-4 py-2">
                  <button
                    className="btn btn-red"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you wish to delete this item?",
                        )
                      )
                        handleDestroy(quizSet.id);
                    }}
                  >
                    Destroy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default QuizSets;
