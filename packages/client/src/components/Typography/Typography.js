import { createElement } from "react";
import styles from "./Typography.module.css";

const classnames = (...args) => {
  return args.filter(Boolean).join(" ");
};

const HeadingLarge = ({ children, color }) => {
  return <h1 className={classnames(styles.headingLarge, color)}>{children}</h1>;
};

const HeadingMedium = ({ children, color }) => {
  return (
    <h2 className={classnames(styles.headingMedium, color)}>{children}</h2>
  );
};

const HeadingSmall = ({ children, color }) => {
  return <h3 className={classnames(styles.headingSmall, color)}>{children}</h3>;
};

const HeadingXS = ({ children, color }) => {
  return (
    <h4 className={classnames(styles.headingXSmall, color)}>{children}</h4>
  );
};

const Body = ({ children, color, as = "p" }) => {
  if (["p", "span", "div"].includes(as)) {
    return createElement(
      as,
      { className: classnames(styles.body, color) },
      children
    );
  }

  return <p className={classnames(styles.body, color)}>{children}</p>;
};

const Typography = {
  HeadingLarge,
  HeadingMedium,
  HeadingSmall,
  HeadingXS,
  Body,
};

export default Typography;
