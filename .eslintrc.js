module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "prettier",
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
  env: {
    browser: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
