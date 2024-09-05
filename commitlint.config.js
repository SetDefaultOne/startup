/**
 * @see https://commitlint.js.org/reference/rules.html
 * @see https://commitlint.js.org/reference/rules-configuration.html
 * @type {import("@commitlint/types").UserConfig}
 */
module.exports = {
    rules: {
        "header-max-length": [2, "always", 50],
        "header-trim": [2, "always"],
        "header-case": [2, "always", ["lower-case"]],
        "type-empty": [2, "never"],
        "type-enum": [2, "always", ["feat", "fix"]],
        "scope-empty": [2, "never"],
        "scope-enum": [2, "always", ["global"]],
        "subject-empty": [2, "never"],
        "subject-full-stop": [2, "never", "."],
        "body-leading-blank": [2, "always"],
        "body-empty": [1, "never"],
        "body-max-line-length": [2, "always", 72],
    },
};
