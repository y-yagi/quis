import { render, screen, fireEvent } from "@testing-library/react";
import QuizSetForm from "../../components/QuizSetForm";
import { ProviderWrapper } from "../utils";
import nock from "nock";
import QuizSet from "../../types/QuizSet";

nock.disableNetConnect();

describe("QuizSetForm", () => {
  it("renders quiz set form with new data", async () => {
    const quizSet: QuizSet = {
      id: 0,
      user_id: "",
      name: "",
      created_at: "",
    };

    render(
      <ProviderWrapper>
        <QuizSetForm quizSet={quizSet} />
      </ProviderWrapper>
    );

    const input = screen.getByLabelText("name");
    fireEvent.change(input, { target: { value: "This is a quiz set" } });
    expect(input.value).toBe("This is a quiz set");

    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("renders quiz set form with existing data", async () => {
    const quizSet: QuizSet = {
      id: 1,
      user_id: "1",
      name: "This is a quiz set",
      created_at: "2022/01/01 00:00",
    };

    render(
      <ProviderWrapper>
        <QuizSetForm quizSet={quizSet} />
      </ProviderWrapper>
    );

    expect(screen.getByText("Submit")).toBeInTheDocument();
    expect(screen.getByDisplayValue("This is a quiz set")).toBeInTheDocument();
  });
});
