type QuizType = {
  id: number;
  user_id: string;
  quiz_set_id: number;
  question: string;
  answer: string;
  enabled: boolean;
  created_at: string;
};

export default QuizType;
