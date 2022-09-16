import Container from "../../components/Container";
import QuizSetForm from "../../components/QuizSetForm";
import { useRouter } from "next/router";
import { useContext } from "react";
import UserContext from "../../lib/UserContext";
import { useFilter, useSelect } from "react-supabase";
import Quizzes from "../../components/Quizzes";

const Edit = () => {
  const router = useRouter();
  const { id } = router.query;

  const user = useContext(UserContext);
  const filter = useFilter(
    (query) => query.eq("user_id", user?.id).eq("id", id),
    [user?.id, id]
  );

  const [{ data, error, fetching }, _reexecute] = useSelect("quiz_sets", {
    filter,
  });

  if (error) return <div>{error.message}</div>;
  if (fetching) return <div>Loading...</div>;
  if (!data) return <div>Something wrong...</div>;

  return (
    <Container>
      <QuizSetForm quizSet={data[0]} />
      <Quizzes quizSetId={data[0].id} />
    </Container>
  );
};

export default Edit;
