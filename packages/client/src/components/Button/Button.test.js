import { render } from "@testing-library/react";
import Button from "./Button";
import { buttonTestkit } from "./Button.testkit";

const renderButton = (props = {}) => {
  return render(<Button {...props} />);
};

describe("Button", () => {
  it("should render the button", () => {
    renderButton();
    expect(buttonTestkit.get()).toBeInTheDocument();
  });

  it("should render the button with the given text", () => {
    const text = "Click me";
    renderButton({ children: text });
    expect(buttonTestkit.get({ name: text })).toBeInTheDocument();
  });

  it("should call the onClick handler when clicked", () => {
    const onClick = jest.fn();
    renderButton({ onClick });
    expect(onClick).toHaveBeenCalledTimes(0);
    buttonTestkit.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
