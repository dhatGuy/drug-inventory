module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "universe/native",
    "universe/shared/typescript-analysis",
    "plugin:tailwindcss/recommended",
    "prettier",
  ],
  rules: {
    // We will use TypeScript's types for component props instead
    "react/prop-types": "off",

    // Why would you want unused vars?
    "@typescript-eslint/no-unused-vars": "warn",

    // I suggest this setting for requiring return types on functions only where useful
    "@typescript-eslint/explicit-function-return-type": "off",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.d.ts"],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: "./tsconfig.json",
        sourceType: "module",
      },
    },
  ],
};
