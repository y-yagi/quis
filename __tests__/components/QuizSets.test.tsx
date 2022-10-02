import { render, screen } from "@testing-library/react";
import { Provider } from "react-supabase";
import QuizSets from "../../components/QuizSets";
import { client } from "../utils";
import nock from "nock";
import { setTimeout } from "timers/promises";

nock.disableNetConnect();

describe("QuizSets", () => {
  it("renders quiz sets", async () => {
    nock("http://localhost")
      .get("/rest/v1/quiz_sets")
      .query({ select: "*", user_id: "eq.undefined" })
      .reply(200, [{ id: 1, name: "QuizSetsTestOne" }]);

    render(
      <Provider value={client}>
        <QuizSets />
      </Provider>
    );
    await setTimeout(100);

    expect(
      screen.getByText("Create a new Quiz Sets").closest("a")
    ).toHaveAttribute("href", "/quiz_sets/new");
    expect(screen.getByText("QuizSetsTestOne")).toBeInTheDocument();
  });
});
