import { render, screen } from "@testing-library/react";
import ErrorMessage from "../../components/ErrorMessage";

describe("ErrorMessage", () => {
  it("renders an error message", () => {
    render(<ErrorMessage message={"This is a dummy message"} />);

    const element = screen.getByTestId("error-message");
    expect(element).toBeInTheDocument();
    expect(element.textContent).toEqual("This is a dummy message");
  });
});
