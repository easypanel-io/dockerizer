# Dockerizer

> Provided by [Easypanel](https://easypanel.io)

## Codebase Structure

Each Dockerizer has its own folder: `src/dockerizers/[name]`

```
index.ts          # dockerizer schema & generation logic

files/            # files, templates, config files
files.json        # compiled from the files folder

tests/
  [test-name]/
    code/         # test application codebase
    input.json    # test input for the dockerizer
```

You can get started by copying the `sample` dockerizer.

On the UI, there is a one or more pages for each Dockerizer. Those live in `src/pages/[name]`

## Development

Run `npm run dev` to start the Next.js application.

## Scripts

- `npm run compile-files` - compiles all the files from a dockerizer to `files.json`
- `npm run compile-files-watch` - watches for changes and run `compile-files` automatically
- `npm run compile-tests` - generates the `dockerizer` folder for each test app based on `input.json`
- `npm run hadolint` - lints all Dockerfiles (make sure you run `compile-tests` before this)
