module.exports = {
    extends: ["@startup/eslint-config"],
    parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
    },
    env: {
        node: true,
        jest: true,
    },
};
