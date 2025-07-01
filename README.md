# Digma UI

Digma UI is a React-based frontend for the Digma continuous feedback platform. The project is a monorepo for multiple React applications and provides the distributions for different platforms: Web and IDEs (JetBrains, Visual Studio and VS Code)

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

Start dev server (with Web distribution):

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
- `vs`
- `web`

Build of the package will be in the `./dist` directory

## Environment variables for Web distribution

To set environment variables use .env file

| Name                            | Type    | Default | Description                                              |
| ------------------------------- | ------- | ------- | -------------------------------------------------------- |
| PORT                            | number  | 3000    | Port (for dev server)                                    |
| UI_BASE_URL                     | string  | -       | Base URL to proxy requests to ingress (for dev server)   |
| JAEGER_API_PATH                 | string  | -       | URL path to proxy requests to Jaeger UI (for dev server) |
| API_BASE_URL                    | string  | -       | Base URL to proxy Digma API requests (for dev server)    |
| AUTH_API_BASE_URL               | string  | -       | Base URL to proxy auth API requests (for dev server)     |
| API_TOKEN                       | string  | -       | API token (for dev server)                               |
| LOGIN                           | string  | -       | User login (for dev server)                              |
| PASSWORD                        | string  | -       | User password (for dev server)                           |
| IS_JAEGER_ENABLED               | boolean | false   | Enable links to Jaeger                                   |
| JAEGER_UI_PATH                  | string  | -       | Path to custom Jaeger UI build                           |
| IS_SANDBOX_ENABLED              | boolean | false   | Enable Sandbox (demo) mode                               |
| ARE_INSIGHT_SUGGESTIONS_ENABLED | boolean | false   | Enable insight suggestions                               |
| GOOGLE_CLIENT_ID                | string  | -       | Google client ID                                         |
| POSTHOG_API_KEY                 | string  | -       | PostHog API key                                          |
| POSTHOG_URL                     | string  | -       | PostHog URL                                              |
| PRODUCT_FRUITS_WORKSPACE_CODE   | string  | -       | Product Fruits workspace code                            |

## Jaeger UI

The Digma UI distribution includes a [Digma fork of Jaeger UI](https://github.com/digma-ai/jaeger-ui). You can find the linked version in the [./dependencies.json](./dependencies.json) file.

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
