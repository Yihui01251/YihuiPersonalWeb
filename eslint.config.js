import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import tseslint from "typescript-eslint";

export default [
  { ignores: ["dist", "node_modules", ".wrangler"] },
  { settings: { react: { version: "detect" } } },
  js.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  jsxA11y.flatConfigs.recommended,
  {
    files: ["**/*.{js,jsx,mjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: { "react-hooks": reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react/prop-types": "off",
      "no-irregular-whitespace": ["error", { skipStrings: true, skipTemplates: true, skipJSXText: true }],
    },
  },
  // 後端（Cloudflare Worker）以 TypeScript 撰寫
  ...tseslint.configs.recommended.map((config) => ({ ...config, files: ["worker/**/*.ts"] })),
  {
    files: ["**/*.test.{js,jsx,ts}", "src/test/**", "worker/test/**"],
    languageOptions: { globals: { ...globals.vitest } },
  },
];
