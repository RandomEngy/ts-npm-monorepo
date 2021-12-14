# ts-npm-monorepo
[NPM Workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces) can be used to implement a monorepo: having multiple NPM packages in the same repository.

This example includes a minimal example with Typescript.

1. Run `npm i` at root
2. Run `npm run build` in `packages/app/` or `packages/shared/`.

## Internal dependencies
Anything put in the `packages/` folder is automatically treated as its own package/workspace. We can depend on another internal package with `"@ts-npm-mono/shared": "*"`.

Packages are set up to depend on each other through [Typescript Project References](https://www.typescriptlang.org/docs/handbook/project-references.html).
If we run with `tsc -b` it will automatically build the dependent packages first.

There is some special file-system linking that happens when you run `npm i`: `node_modules/@ts-npm-mono/shared/` links directly to `packages/shared/`, so any edits are immediately seen by packages that depend on them.

## External dependencies
You have two choices of where to reference external dependencies:

1. In the root `package.json`. This is good when you want to have all of your packages use the same version of the dependency, as everything in the repo can import from them and it only needs to be declared once. In this example `date-fns` is declared at the top level but used inside the `shared` package.
2. In the `package.json` files under `packages/`. This will still install them to top-level `node_modules` folder, unless the version is different from one declared at root. This might be handy if only that package uses the dependency. In this example the `uuid` dependency is declared in the `app/package.json`, but still installs to the root `node_modules`.

All package `tsconfig.json` files derive from the one at root. The root specifies `"composite": true` to allow Typescript project references.
It also enables `declaration` and `declarationMap` to allow exporting types to other packages.