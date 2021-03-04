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
          ["sm", "md", "lg", ""].map((size) =>
            ["primary", "outline", "inverse"].map((variant) =>
              [true, false].map((isFullWidth) => (
                <Button
                  variant={variant}
                  size={size}
                  fullWidth={isFullWidth}
                  as={element}
                >
                  {isFullWidth ? "full-width" : ""} {size} {variant}
                </Button>
              ))
            )
          )
        )}
      </div>
    </Demo>
  );
};

ReactDOM.render(<ButtonsDemo />, document.querySelector("#root"));
