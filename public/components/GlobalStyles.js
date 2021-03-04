import { createGlobalStyle } from "styled-components";
import sofiaProBlack from "url:../fonts/sofia_pro_black.otf";
import sofiaProBold from "url:../fonts/sofia_pro_bold.otf";
import sofiaProRegular from "url:../fonts/sofia_pro_regular.otf";
import greasePencil from "url:../fonts/greasepencil.otf";

export default createGlobalStyle`
  @font-face {
    font-family: "sofia_pro";
    src: url(${sofiaProBlack}) format("opentype");
    font-weight: 900;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "sofia_pro";
    src: url(${sofiaProBold}) format("opentype");
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "sofia_pro";
    src: url(${sofiaProRegular}) format("opentype");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "greasepencil";
    src: url(${greasePencil}) format("opentype");
    font-weight: normal;
    font-style: normal;
  }
  
  * {
    box-sizing: border-box;
  }

  body {
    background-color: white;
    color: #572d2d;
    padding: 0;
    margin: 0;
    font-family: sofia_pro, Helvetica, Arial, sans-serif;
  }
`;
