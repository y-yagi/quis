import Container from "../../components/Container";
import QuisSetForm from "../../components/QuizSetForm";
import QuizSet from "../../types/QuizSet";
import { useRouter } from "next/router";
import { useContext } from "react";
import UserContext from "../../lib/UserContext";
import { useFilter, useSelect } from "react-supabase";

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
      <QuisSetForm quizSet={data[0]} />
    </Container>
  );
};

export default Edit;
