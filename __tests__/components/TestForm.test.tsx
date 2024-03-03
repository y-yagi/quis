import { render, screen, fireEvent } from "@testing-library/react";
import TestForm from "../../components/TestForm";
import { ProviderWrapper } from "../utils";
import Quiz from "../../types/Quiz";

const quizzes: Quiz[] = [
  {
    id: 1,
    user_id: "1",
    quiz_set_id: 1,
    question: "最近どう",
    answer: "How are you doing?",
    enabled: true,
    created_at: "2022-01-01",
  },
];

describe("TestForm", () => {
  it("renders Test Form", async () => {
    render(
      <ProviderWrapper>
        <TestForm quizzes={quizzes} />
      </ProviderWrapper>,
    );

    expect(screen.getByText("最近どう")).toBeInTheDocument();
    expect(screen.queryByText("How are you doing?")).toBeNull();
    expect(screen.getByText("Check")).toBeInTheDocument();
  });

  it("when the correct answer inputted", async () => {
    render(
      <ProviderWrapper>
        <TestForm quizzes={quizzes} />
      </ProviderWrapper>,
    );

    const input = screen.getByPlaceholderText("Put in your answer.");
    fireEvent.change(input, { target: { value: "How are you doing?" } });
    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByText("Correct!")).toBeInTheDocument();
    expect(screen.getByText("Retry")).toBeInTheDocument();
    expect(screen.getByText("Finish")).toBeInTheDocument();
  });

  it("when the wrong answer inputted", async () => {
    render(
      <ProviderWrapper>
        <TestForm quizzes={quizzes} />
      </ProviderWrapper>,
    );

    const input = screen.getByPlaceholderText("Put in your answer.");
    fireEvent.change(input, { target: { value: "How are you d?" } });
    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByTestId("show-answer").textContent).toBe(
      'Wrong! The answer is " How are you doing? "',
    );
    expect(screen.getByText("Retry")).toBeInTheDocument();
    expect(screen.getByText("Finish")).toBeInTheDocument();
  });
});
