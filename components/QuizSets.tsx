import { useContext, useEffect, useState } from "react";
import { useFilter, useSelect } from "react-supabase";
import UserContext from "../lib/UserContext";

const QuizSets = () => {
  const user = useContext(UserContext);
  const filter = useFilter(
    (query) => query.eq('user_id', user?.id),
    [user?.id],
  )

  const [{ data, error, fetching }, _reexecute] = useSelect('quiz_sets', { filter })

  if (error) return <div>{error.message}</div>
  if (fetching) return <div>Loading...</div>
  if (data?.length === 0) return <div>No quis sets</div>

  return (
    <section>
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
            {data?.map((quisSet) => (
                <tr key={quisSet.id} className="border">
                    <td className="px-4 py-2">
                        <span className="text-blue-900">
                            {quisSet.name}
                        </span>
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
