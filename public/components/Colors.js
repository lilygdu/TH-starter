import React from "react";
import palette from "../styles/palette";

const Colors = () => (
  <main>
    {Object.keys(palette)
      .filter((color) => typeof palette[color] === "string")
      .map((color) => (
        <div key={color}>
          <h2>{color}</h2>
          <div
            style={{
              height: "10rem",
              width: "10rem",
              backgroundColor: palette[color],
              color: color === "black" ? "white" : "black",
              display: "grid",
              placeItems: "center",
              border: "1px solid black",
            }}
          >
            {palette[color]}
          </div>
        </div>
      ))}

    {Object.keys(palette)
      .filter((color) => typeof palette[color] === "object")
      .map((color) => (
        <div key={color}>
          <h2>{color}</h2>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {Object.keys(palette[color]).map((variant) => (
              <div
                key={color + variant}
                style={{
                  height: "10rem",
                  width: "10rem",
                  backgroundColor: palette[color][variant],
                  color: color === "gray" ? "red" : "gray",
                  display: "grid",
                  placeItems: "center",
                  border: "1px solid black",
                }}
              >
                {variant}
              </div>
            ))}
          </div>
        </div>
      ))}
  </main>
);

export default Colors;
