import Container from "../../components/Container";
import QuizSetForm from "../../components/QuizSetForm";
import QuizSet from "../../types/QuizSet";

const New = () => {
  const quizSet: QuizSet = {
    id: 0,
    user_id: "",
    name: "",
    created_at: "",
  };

  return (
    <Container>
      <QuizSetForm quizSet={quizSet} />
    </Container>
  );
};

export default New;
