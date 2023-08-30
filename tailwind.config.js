/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "12px",
    },
    extend: {
      colors: {
        bgDark: "#262626",
        noir: "#030303",
        lightGrey: "#EBEBEB",
        darkGrey: "#7A7A7A",
        blue: "#2200FF",
        grey: {
          light: "#EFEFEF",
          def: "#F2F2F2",
          dark: "#7A7A7A",
        },
      },
      fontFamily: {
        sans: ["var(--font-autaut)"],
        monument: ["var(--font-monument)"],
        gaisyr: ["var(--font-gaisyr)"],
      },
      letterSpacing: {
        tighter: "-0.02em",
        tight: "-0.01em",
        wide: "0.01em",
        wider: "0.02em",
      },
      lineHeight: { tightest: "1.1", spaced: "1.4" },
      fontSize: { smaller: ["13px"] },
      height: {
        screen: "100dvh",
      },
      minHeight: {
        screen: "100dvh",
      },
    },
  },
  plugins: [],
};
