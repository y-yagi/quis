import { useRouter } from "next/router";
import { useContext } from "react";
import { useFilter, useSelect } from "react-supabase";
import Container from "../../components/Container";
import TestForm from "../../components/TestForm";
import UserContext from "../../lib/UserContext";
import Quiz from "../../types/Quiz";

export default function Index() {
  const router = useRouter();
  const { quiz_set_id } = router.query;
  const user = useContext(UserContext);
  const filter = useFilter(
    (query) =>
      query
        .eq("user_id", user?.id)
        .eq("quiz_set_id", quiz_set_id)
        .eq("enabled", false)
        .order("created_at"),
    [user?.id]
  );
  const [{ data, error, fetching }, _reexecute] = useSelect("quizzes", {
    filter,
  });

  if (error) return <div>{error.message}</div>;
  if (fetching) return <div>Loading...</div>;

  if (data?.length === 0) {
    return (
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
        <strong className="font-bold">There are no tests.</strong>
      </div>
    );
  }

  return (
    <Container>
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Test
      </h1>
      <div className="min-h-screen flex">
        <div className="w-full">
          {data?.map((quiz: Quiz) => (
            <TestForm key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </div>
    </Container>
  );
}
