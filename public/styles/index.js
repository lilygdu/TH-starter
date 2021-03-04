import palette from "./palette";

export default {
  breakpoint: "815px",
  fontFamily: {
    default: "sofia_pro, Helvetica, Arial, sans-serif",
  },
  boxShadow: {
    button: `0px 0px 0px 4px ${palette.red.one}`,
  },
  fontSize: {
    button: {
      sm: "0.9rem",
      md: "0.9rem",
      lg: "1.25rem",
    },
  },
  size: {
    button: {
      sm: {
        width: "3rem",
        height: "2.25rem",
      },
      md: {
        width: "5.5rem",
        height: "2.25rem",
      },
      lg: {
        width: "initial",
        height: "initial",
      },
    },
  },
  padding: {
    button: {
      sm: "initial",
      md: "initial",
      lg: "0.75rem 3rem",
    },
  },
  color: {
    header: {
      top: {
        background: palette.red.three,
        gradient: {
          middle: palette.red.four,
          sides: palette.red.three,
        },
      },
      text: palette.white,
    },
    footer: {
      background: palette.gray.one,
      tilebottom: palette.gray.three,
      link: {
        main: palette.red.four,
        bottom: palette.brown.three,
        socials: palette.brown.three,
      },
      socials: {
        color: palette.brown.three,
        hover: {
          background: palette.red.three,
          color: palette.white,
        },
      },
    },
    button: {
      primary: {
        background: palette.red.three,
        text: palette.white,
        border: palette.red.three,
        hover: {
          background: palette.red.five,
          border: palette.red.five,
        },
        active: {
          background: palette.red.three,
          text: palette.white,
          border: palette.red.three,
        },
      },
      inverse: {
        background: palette.white,
        border: palette.white,
        text: palette.red.three,
        hover: {
          background: palette.red.one,
          border: palette.red.one,
        },
        active: {
          background: palette.red.three,
          text: palette.white,
          border: palette.red.three,
        },
      },
      outline: {
        background: palette.white,
        border: palette.red.three,
        text: palette.red.three,
        hover: {
          background: palette.red.one,
          border: palette.red.three,
        },
        active: {
          background: palette.red.three,
          text: palette.white,
          border: palette.red.three,
        },
      },
      disabled: {
        background: palette.gray.two,
        text: palette.gray.five,
        border: palette.gray.two,
      },
    },
  },
};
