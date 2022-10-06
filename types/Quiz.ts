import { Database } from "./schema.gen";

type QuizType = Database["public"]["Tables"]["quizzes"]["Row"];

export default QuizType;
