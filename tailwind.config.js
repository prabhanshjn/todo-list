module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  plugins: [require("daisyui")],

  daisyui: {
    styled: true,
    themes: false,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkMode: "class",
  },
};
