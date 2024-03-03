import Container from "../../components/Container";
import { useRouter } from "next/router";
import { useContext } from "react";
import UserContext from "../../lib/UserContext";
import { useFilter, useSelect } from "react-supabase";
import QuizForm from "../../components/QuizForm";
import { UNEXIST_BIGINT_ID } from "../../lib/supabaseHelper";

const Edit = () => {
  const router = useRouter();
  const { id } = router.query;

  const user = useContext(UserContext);
  const filter = useFilter(
    (query) => query.eq("user_id", user?.id).eq("id", id || UNEXIST_BIGINT_ID),
    [user?.id, id],
  );

  const [{ data, error, fetching }, _reexecute] = useSelect("quizzes", {
    filter,
  });

  if (error) return <div>{error.message}</div>;
  if (fetching) return <div>Loading...</div>;
  if (!data) return <div>Something wrong...</div>;
  if (data.length === 0) return <div>Loading...</div>;

  return (
    <Container>
      <QuizForm quiz={data[0]} />
    </Container>
  );
};

export default Edit;
