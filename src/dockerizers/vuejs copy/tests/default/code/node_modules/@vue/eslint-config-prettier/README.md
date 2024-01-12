# @vue/eslint-config-prettier

> eslint-config-prettier for Vue

This config is specifically designed to be used by `@vue/cli` & `create-vue` setups
and is not meant for outside use (it can be used but some adaptations
on the user side might be needed - for details see the config file).

A part of its design is that this config may implicitly depend on
other parts of `@vue/cli`/`create-vue` setups.

## Installation

Before [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files-new) becomes stable, in order to work around [a known limitation in ESLint](https://github.com/eslint/eslint/issues/3458), we recommend you to use this package alongside `@rushstack/eslint-patch`, so that you don't have to install too many dependencies:

```sh
npm add --dev @vue/eslint-config-prettier @rushstack/eslint-patch
```

Please also make sure that you have `prettier` and `eslint` installed.

## Usage

Add `"@vue/eslint-config-prettier"` to the `"extends"` array in your `.eslintrc.cjs` file. Make sure to put it **last**, so it gets the chance to override other configs.

```js
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  extends: [
    // ... other configs
    "@vue/eslint-config-prettier"
  ]
}
```

This configuration is the most straightward way to use ESLint with Prettier.

It disables all rules that are unnecessary or might conflict with Prettier.
It also enables the `eslint-plugin-prettier` plugin, which runs Prettier as an ESLint rule and reports differences as individual ESLint issues.

By default all formatting issues are reported as warnings, and will be automatically fixed during `eslint --fix`.

## Use Separate Commands for Linting and Formatting

While the above setup is very straightforward, it is not necessarily the best way.

Running prettier inside the linter slows down the linting process, might clutter the editor with annoying warnings, and adds one layer of indirection where things may break.
[Prettier's official documentation](https://prettier.io/docs/en/integrating-with-linters.html) recommends using separate commands for linting and formatting, i.e., Prettier for code formatting concerns and ESLint for code-quality concerns.

So we offered an additional ruleset to support this workflow:

```js
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  extends: [
    // ... other configs
    "@vue/eslint-config-prettier/skip-formatting"
  ]
}
```

Formatting issues won't be reported with this config.

You can run `prettier --check .` separately to check for formatting issues, or `prettier --write .` to fix them.

## Further Reading

The default config is based on the recommended configuration of [`eslint-plugin-prettier`](https://github.com/prettier/eslint-plugin-prettier/#recommended-configuration), which also depends on [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier). Please refer to their corresponding documentations for more implementation details.
