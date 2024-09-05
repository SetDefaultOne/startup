/** @type {import("syncpack").RcFile} */
module.exports = {
    indent: "    ",
    semverGroups: [
        {
            range: "",
            packages: ["**"],
            dependencies: ["**"],
            label: "dependency versions must always be exact",
        },
    ],
    versionGroups: [
        {
            // Skip version number check for workspace packages
            packages: ["**"],
            dependencies: ["@startup/**"],
            specifierTypes: ["latest"],
        },
        {
            dependencies: ["@types/**"],
            dependencyTypes: ["!dev"],
            isBanned: true,
            label: "@types packages must be loaded as devDependencies",
        },
    ],
};
