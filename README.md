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

Start dev server:

```shell
npm run start
```

Dev server will start on `http://localhost:3000`

Build package:

```shell
npm run build:prod:{platform}
```

Supported `platform` values:

- `jetbrains`
- `web`

Build of the package will be in the `./dist` directory

## Environment variables

To set environment variables use .env file

| Name              | Type   | Default | Description                                               |
| ----------------- | ------ | ------- | --------------------------------------------------------- |
| UI_BASE_URL       | string | -       | Base URL to proxy requests to ingress (for dev server)    |
| JAEGER_API_PATH   | string | -       | URL path to proxy requests to Jaeger UI (for dev server ) |
| API_BASE_URL      | string | -       | Base URL to proxy Digma API requests (for dev server)     |
| AUTH_API_BASE_URL | string | -       | Base URL to proxy auth API requests (for dev server)      |
| API_TOKEN         | string | -       | API token (for dev server)                                |
| USERNAME          | string | -       | User login (for dev server)                               |
| PASSWORD          | string | -       | User password (for dev server)                            |
| JAEGER_UI_PATH    | string | -       | Path to custom Jaeger UI build                            |

## Jaeger UI

The Digma UI distributive includes a [Digma fork of Jaeger UI](https://github.com/digma-ai/jaeger-ui). You can find the linked version in the [./dependencies.json](./dependencies.json) file.

To use a custom build of Jaeger UI during development set `JAEGER_UI_PATH` environment variable.

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
