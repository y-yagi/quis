import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useDelete, useFilter, useSelect } from "react-supabase";
import UserContext from "../lib/UserContext";
import Quiz from "../types/Quiz";

interface Props {
  quizSetId: number;
}

const Quizzes: NextPage<Props> = ({ quizSetId }) => {
  const router = useRouter();
  const user = useContext(UserContext);
  const filter = useFilter(
    (query) => query.eq("user_id", user?.id).eq("quiz_set_id", quizSetId),
    [user?.id]
  );

  const [{ data, error, fetching }, _reexecute] = useSelect("quizzes", {
    filter,
  });
  const [_, execute] = useDelete("quizzes");

  const handleDestroy = async (id: string) => {
    const { count, data, error } = await execute((query) => query.eq("id", id));
    // TODO: error handling
    router.reload();
  };

  if (error) return <div>{error.message}</div>;
  if (fetching) return <div>Loading...</div>;

  return (
    <section>
      <div>
        <p className="mb-8 underline tracking-tighter m-5">
          <Link href={`/quizzes/new?quiz_set_id=${quizSetId}`}>
            <a>Add a new Quiz</a>
          </Link>
        </p>
      </div>
      <div className="grid">
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
            {data?.map((quiz: Quiz) => (
              <tr key={quiz.id} className="border">
                <td className="px-4 py-2">
                  <span>{quiz.question}</span>
                </td>
                <td className="px-4 py-2">
                  <span>{quiz.answer}</span>
                </td>
                <td className="px-4 py-2">
                  <Link href={`/quizzes/${quiz.id}/?quiz_set_id=${quizSetId}`}>
                    <button className="btn btn-blue">Edit</button>
                  </Link>
                </td>
                <td className="px-4 py-2">
                  <button
                    className="btn btn-red"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you wish to delete this item?"
                        )
                      )
                        handleDestroy(quiz.id);
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

export default Quizzes;
