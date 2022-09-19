import { useRouter } from "next/router";
import Container from "../../components/Container";
import QuizForm from "../../components/QuizForm";
import Quiz from "../../types/Quiz";

const New = () => {
  const router = useRouter();
  const { quiz_set_id } = router.query;

  const quiz: Quiz = {
    id: 0,
    user_id: "",
    quiz_set_id: parseInt(quiz_set_id as string, 10),
    question: "",
    answer: "",
    enabled: true,
    created_at: "",
  };

  return (
    <Container>
      <QuizForm quiz={quiz} />
    </Container>
  );
};

export default New;
