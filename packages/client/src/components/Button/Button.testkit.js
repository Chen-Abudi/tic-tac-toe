import { screen } from "@testing-library/react";
import user from "@testing-library/user-event";

export const buttonTestkit = {
  get: (options) => screen.getByRole("button", options),
  click: (options) => {
    const button = buttonTestkit.get(options);
    user.click(button);
  },
};
