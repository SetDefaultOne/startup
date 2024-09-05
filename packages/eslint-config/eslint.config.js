/** @type {import("eslint").Linter.Config} */
module.exports = {
    extends: ["plugin:@typescript-eslint/recommended"],
    plugins: ["@typescript-eslint/eslint-plugin", "prettier"],
    parser: "@typescript-eslint/parser",
    rules: {
        "prettier/prettier": "warn",
    },
    ignorePatterns: [".eslintrc.js", "eslint.config.js"],
};
