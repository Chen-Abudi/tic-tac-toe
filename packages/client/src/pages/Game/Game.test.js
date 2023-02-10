import { render } from "@testing-library/react";
import { buttonTestkit } from "../../components/Button/Button.testkit";
import Game from "./Game";

const renderGame = (props = {}) => render(<Game {...props} />);

describe("Game", () => {
  it("should have start game button - example", () => {
    renderGame();
    expect(buttonTestkit.get({ name: /start game/i })).toBeInTheDocument();
  });
});
