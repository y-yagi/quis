import Container from "../components/Container";
import Intro from "../components/Intro";
import QuizSets from "../components/QuizSets";
import { Provider } from "react-supabase";

export default function Index() {
  return (
    <Container>
      <Intro />
      <QuizSets />
    </Container>
  );
}
