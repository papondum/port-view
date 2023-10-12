import { createStitches } from "@stitches/react";

export const {
  config,
  createTheme,
  css,
  globalCss,
  getCssText,
  styled,
  keyframes,
  theme,
} = createStitches({
  theme: {
    colors: {
      primary: "#0D47A1",
      secondary: "#448AFF",
      gray: "#9F9F9F",
      highlight: "#E6517A",
      white: "#FFFFFF",
      basebg: "#fafafa",
      text: "#000",
      backdrop90: "rgba(0, 0, 0, 0.9)",
    },
    shadows: {
      primary: "#ED1C24",
      primaryDark: "#94141E",
      white: "#FFFFFF",
      black: "#000000",
      gray900: "#444444",
      gray800: "#5D5D5D",
      gray700: "#777777",
      gray600: "#909090",
      gray500: "#AAAAAA",
      gray400: "#C3C3C3",
      gray300: "#EBEBEB",
      gray200: "#F6F6F6",
      gray100: "#FFFFFF",
      shadow100: "0px 8px 16px rgba(0, 0, 0, 0.04)",
      shadow200: "0px 16px 40px rgba(0, 0, 0, 0.08)",
    },
    space: {
      1: "4px",
      2: "8px",
      3: "12px",
      4: "16px",
      5: "20px",
      6: "24px",
      7: "32px",
      8: "36px",
      9: "40px",
      10: "44px",
      11: "48px",
      12: "56px",
      13: "64px",
      14: "80px",
      15: "96px",
      16: "112px",
    },
    sizes: {
      1: "4px",
      2: "8px",
      3: "12px",
      4: "16px",
      5: "20px",
      6: "24px",
      7: "32px",
      8: "36px",
      9: "40px",
      10: "44px",
      11: "48px",
      12: "56px",
      13: "64px",
      14: "80px",
      15: "96px",
      16: "112px",
    },
    fontSizes: {
      1: "16px",
      2: "18px",
      3: "20px",
      4: "24px",
      5: "30px",
      6: "36px",
      7: "56px",
    },
  },
  media: {
    maxxs: "(max-width: 479px)",
    maxsm: "(max-width: 639px)",
    maxmd: "(max-width: 767px)",
    maxlg: "(max-width: 1023px)",
    maxxl: "(max-width: 1279px)",
    max2xl: "(max-width: 1439px)",
    init: "(min-width: 0px)",
    xs: "(min-width: 390px)",
    // sm: "(min-width: 640px)",
    md: "(min-width: 843px)",
    lg: "(min-width: 1024px)",
    // xl: "(min-width: 1280px)",
    xl: "(min-width: 1440px)",
  },
  utils: {
    p: (value) => ({
      padding: value,
    }),
    pt: (value) => ({
      paddingTop: value,
    }),
    pb: (value) => ({
      paddingBottom: value,
    }),
    pl: (value) => ({
      paddingLeft: value,
    }),
    pr: (value) => ({
      paddingRight: value,
    }),
    px: (value) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    m: (value) => ({
      margin: value,
    }),
    mt: (value) => ({
      marginTop: value,
    }),
    mb: (value) => ({
      marginBottom: value,
    }),
    ml: (value) => ({
      marginLeft: value,
    }),
    mr: (value) => ({
      marginRight: value,
    }),
    mx: (value) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value) => ({
      marginTop: value,
      marginBottom: value,
    }),
    ox: (value) => ({ overflowX: value }),
    oy: (value) => ({ overflowY: value }),
    pe: (value) => ({
      pointerEvents: value,
    }),
    us: (value) => ({
      WebkitUserSelect: value,
      userSelect: value,
    }),
    size: (value) => ({
      width: value,
      height: value,
    }),
    ap: (value) => ({
      WebkitAppearance: value,
      appearance: value,
    }),
    bs: (value) => ({ boxShadow: value }),
    br: (value) => ({
      borderRadius: value,
    }),
    bc: (value) => ({
      backgroundColor: value,
    }),
    linearGradient: (value) => ({
      backgroundImage: `linear-gradient(${value})`,
    }),
  },
});

export const globalStyles = globalCss({
  ":root": {
    "--transition-duration": "0.5s",
    "--transition-easing": "cubic-bezier(0.25, 0.74, 0.22, 0.99)",
    "--transition-delay": "0s",
    "--transition-easing-slider": "cubic-bezier(0.39, 0.01, 0.04, 1)",
    "--viewport-height": "calc(var(--vh, 1vh)*100)",
    "--secondary-nav-height": "0px",
    "--primary-nav-height": "60px",
    "@lg": {
      "--secondary-nav-height": "40px",
      "--primary-nav-height": "54px",
    },
    "--header-height":
      "calc(var(--secondary-nav-height) + var(--primary-nav-height))",
    "--sticky-top": 0,
    "--sticky-viewport-height": "calc(var(--vh, 1vh)*100)",
    "--product-nav-height": "60px",
  },
  html: {
    "-webkit-font-smoothing": "antialiased",
    "-moz-osx-font-smoothing": "grayscale",
    bc: "$white",
  },
  "html, body": {
    "-ms-text-size-adjust": "none",
    "-moz-text-size-adjust": "none",
    "-webkit-text-size-adjust": "none",
    textSizeAdjust: "none",
    bc: "$basebg",
  },
  "*": {
    margin: 0,
    padding: 0,
    "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)",
  },
  "*, :after, :before": {
    boxSizing: "border-box",
  },
  body: {
    width: "100%",
    margin: 0,
    fontFamily: "$thReg",
    scrollBehavior: "smooth",
    color: "$text",
  },
  "article, aside, footer, header, nav, main, section, picture, figcaption, figure":
    {
      display: "block",
    },
  "ul, ol": {
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  ".swiper-wrapper": { justifyContent: "center" },
  ".anticon-close": { color: "white" },
  ".ant-collapse-header-text": { color: "white" },
  ".ant-collapse-header": { p: "0px !important" },
  ".ant-collapse-expand-icon": { display: "none !important" },
  a: {
    textDecoration: "none",
    outline: "none",
  },
  "blockquote,dd,dl,dt": {
    margin: 0,
  },
  "img, embed, object, video": {
    maxWidth: "100%",
  },
  img: {
    display: "block",
    us: "none",
    border: 0,
    "&[draggable=false]": {
      pe: "none",
      "-webkit-user-drag": "none",
    },
  },
  iframe: {
    display: "block",
    border: 0,
  },
});

// export type CSS = Stitches.CSS<typeof config>;
