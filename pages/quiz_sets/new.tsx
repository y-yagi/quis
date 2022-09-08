import Container from "../../components/Container";
import QuisSetForm from "../../components/QuizSetForm";
import QuizSet from "../../types/QuizSet";

const New = () => {
  const quizSet: QuizSet = {
    id: "",
    user_id: "",
    name: "",
    created_at: "",
  };

  return (
    <Container>
      <QuisSetForm quizSet={quizSet} />
    </Container>
  );
};

export default New;
