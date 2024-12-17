# Digma UI

Install dependencies:

```shell
npm ci
```

Run linter checks:

```shell
npm run lint
```

Run tests:

```shell
npm run test
```

Build package:

```shell
npm run build:prod:{platform}
```

Supported `platform` values:

- `jetbrains`
- `web`

Build of the package will be in the `./dist` directory

## Jaeger UI

The Digma UI distributive includes a [Digma fork of Jaeger UI](https://github.com/digma-ai/jaeger-ui). You can find the linked version in the [./dependencies.json](./dependencies.json) file.

To use a custom build of Jaeger UI during development, create a `.env` file in the root of this repository and add the following line:

```env
JAEGER_UI_PATH=path/to/jaeger-ui/dist
```

## Storybook

```shell
npm run storybook
```

Storybook will start on `http://localhost:6006`

## License

MIT
