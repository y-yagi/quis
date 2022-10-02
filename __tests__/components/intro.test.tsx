import { render, screen } from "@testing-library/react";
import Intro from "../../components/Intro";

describe("Intro ", () => {
  it("renders a heading", () => {
    render(<Intro />);

    const heading = screen.getByRole("heading", {
      name: /Choose Quiz/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
