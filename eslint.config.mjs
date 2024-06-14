import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js"
import { fixupConfigRules } from "@eslint/compat"
import eslintConfigPrettier from "eslint-config-prettier"

export default [
  { files: ["**/*.js", "**/*.tsx"], languageOptions: { sourceType: "script" } },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  eslintConfigPrettier,
  {
    rules: {
      // "vue/no-multiple-template-root": "off",
      // "no-unused-vars": [
      //   "error",
      //   {
      //     vars: "all",
      //     args: "after-used",
      //     caughtErrors: "all",
      //     ignoreRestSiblings: false,
      //     reportUsedIgnorePattern: false,
      //     "no-undef": "error",
      //   },
      // ],
    },
  },
]
