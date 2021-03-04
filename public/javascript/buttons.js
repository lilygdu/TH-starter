import React from "react";
import ReactDOM from "react-dom";

import Demo from "../components/Demo";
import Button from "../components/Button";

const ButtonsDemo = () => {
  return (
    <Demo>
      <h1>Buttons Demo</h1>
      <div>
        {["button", "a"].map((element) =>
          ["lg", "md"].map((size) =>
            ["primary", "outline", "inverse"].map((variant) =>
              [true, false].map((isFullWidth) =>
                [true, false].map((isDisabled) => (
                  <Button
                    variant={variant}
                    size={size}
                    fullWidth={isFullWidth}
                    as={element}
                    disabled={isDisabled}
                    key={`${element}-${size}-${isFullWidth}-${variant}-${isDisabled}`}
                    href={
                      element === "a"
                        ? "https://styled-components.com/docs/api#as-polymorphic-prop"
                        : undefined
                    }
                  >
                    {isFullWidth ? "full-width" : ""}{" "}
                    {isDisabled ? "disabled" : ""} {size} {variant}{" "}
                    {element === "a" ? "link" : ""}
                  </Button>
                ))
              )
            )
          )
        )}
      </div>
    </Demo>
  );
};

ReactDOM.render(<ButtonsDemo />, document.querySelector("#root"));
