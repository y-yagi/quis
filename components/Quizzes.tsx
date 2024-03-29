import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useDelete, useFilter, useSelect } from "react-supabase";
import UserContext from "../lib/UserContext";
import Quiz from "../types/Quiz";
import ErrorMessage from "./ErrorMessage";

interface Props {
  quizSetId: number;
}

const Quizzes: NextPage<Props> = ({ quizSetId }) => {
  const router = useRouter();
  const user = useContext(UserContext);
  const [errmsg, setErrmsg] = useState("");
  const filter = useFilter(
    (query) =>
      query
        .eq("user_id", user?.id)
        .eq("quiz_set_id", quizSetId)
        .order("created_at"),
    [user?.id],
  );

  const [{ data, error, fetching }, _reexecute] = useSelect("quizzes", {
    filter,
  });
  const [_, execute] = useDelete("quizzes");

  const handleDestroy = async (id: number) => {
    const { error } = await execute((query) =>
      query.eq("id", id).eq("user_id", user?.id),
    );
    if (error) {
      setErrmsg(error.message);
    } else {
      router.reload();
    }
  };

  const genereateQuizzesDownloadURL = (): string => {
    const csvData = data
      ?.map((record) => `"${record.question}","${record.answer}"`)
      .join("\r\n");
    // The bom for Excel.
    const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
    return URL.createObjectURL(
      new Blob([bom, csvData as string], { type: "text/csv" }),
    );
  };

  if (error) return <div>{error.message}</div>;
  if (fetching) return <div>Loading...</div>;

  return (
    <section>
      <div>
        <p className="mb-8 underline tracking-tighter m-3">
          <Link href={`/quizzes/new?quiz_set_id=${quizSetId}`}>
            <a>Add a new Quiz</a>
          </Link>
          <span className="ml-5">
            <a href={genereateQuizzesDownloadURL()} download={`quizzes.csv`}>
              Download quizzes
            </a>
          </span>
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
                          "Are you sure you wish to delete this item?",
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
