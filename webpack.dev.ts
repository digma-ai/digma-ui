import axios from "axios";
import dotenv from "dotenv";
import https from "https";
import path from "path";
import { createTransformer as createStyledComponentsTransformer } from "typescript-plugin-styled-components";
import type { WebpackConfiguration } from "webpack-dev-server";
import { appData } from "./apps";

interface Credentials {
  username: string;
  password: string;
}

interface Session {
  accessToken: string;
  refreshToken: string;
  expiration: string;
  userId: string;
}

const DEFAULT_PORT = 3000;

dotenv.config();

if (!process.env.LOGIN || !process.env.PASSWORD) {
  throw new Error("Login and password must be provided");
}

let session: Session | undefined;

const credentials: Credentials = {
  username: process.env.LOGIN,
  password: process.env.PASSWORD
};

const apiProxyClient = axios.create({
  baseURL: process.env.API_BASE_URL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  }),
  headers: {
    "Digma-Access-Token": `Token ${process.env.API_TOKEN}`
  }
});

const login = async (credentials: Credentials) => {
  const response = await apiProxyClient.post<{
    accessToken: string;
    refreshToken: string;
    expiration: string;
    userId: string;
  }>("/authentication/login", credentials);

  return response.data;
};

const refreshToken = async (session: Session) => {
  const response = await apiProxyClient.post<{
    accessToken: string;
    refreshToken: string;
    expiration: string;
    userId: string;
  }>("/authentication/refresh-token", {
    accessToken: session.accessToken,
    refreshToken: session.refreshToken
  });

  return response.data;
};

const getSession = async (
  credentials: Credentials,
  session: Session | undefined
) => {
  if (!session) {
    return await login(credentials);
  } else {
    const expiration = new Date(session.expiration).valueOf();

    if (expiration < Date.now()) {
      return await refreshToken(session);
    }
  }

  return session;
};

const styledComponentsTransformer = createStyledComponentsTransformer();

const webApps = Object.entries(appData)
  .filter(([, entry]) => entry.platforms.includes("web"))
  .map(([name]) => name);

const config: WebpackConfiguration = {
  extends: path.resolve(__dirname, "./webpack.common.ts"),
  mode: "development",
  output: {
    filename: "[name]/index.js" // Do not use contenthash to avoid piling up files in memory on recompile
  },
  devtool: "eval-source-map",
  devServer: {
    historyApiFallback: {
      rewrites: [
        // Bypass HMR-related requests
        {
          from: /\.hot-update\.json$/,
          to: ({ request }) => request.url
        },
        ...webApps.map((app) => ({
          from: new RegExp(`/${app}/`),
          to: `/${app}/index.html`
        }))
      ]
    },
    port: process.env.PORT ?? DEFAULT_PORT,
    proxy: [
      {
        context: ["/api"],
        target: process.env.API_BASE_URL,
        pathRewrite: { "^/api": "" },
        secure: false,
        changeOrigin: true
      },
      ...(process.env.UI_BASE_URL && process.env.JAEGER_API_PATH
        ? [
            {
              context: [process.env.JAEGER_API_PATH],
              target: `${process.env.UI_BASE_URL}${process.env.JAEGER_API_PATH}`,
              pathRewrite: { "^/api": "" },
              secure: false,
              changeOrigin: true
            }
          ]
        : []),
      {
        context: ["/auth"],
        target: process.env.AUTH_API_BASE_URL,
        secure: false,
        changeOrigin: true
      }
    ],
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error("webpack-dev-server is not defined");
      }

      webApps.forEach((app) =>
        devServer.app?.get(`/${app}/env.js`, (req, res) => {
          const envVariables = {
            platform: "Web",
            isJaegerEnabled: process.env.IS_JAEGER_ENABLED === "true",
            jaegerURL: process.env.JAEGER_URL,
            jaegerApiPath: process.env.JAEGER_API_PATH,
            isSandboxModeEnabled:
              process.env.IS_SANDBOX_MODE_ENABLED === "true",
            areInsightSuggestionsEnabled:
              process.env.ARE_INSIGHT_SUGGESTIONS_ENABLED === "true",
            isAgenticEnabled: process.env.IS_AGENTIC_ENABLED === "true",
            googleClientId: process.env.GOOGLE_CLIENT_ID,
            postHogApiKey: process.env.POSTHOG_API_KEY,
            postHogHost: process.env.POSTHOG_URL,
            productFruitsWorkspaceCode:
              process.env.PRODUCT_FRUITS_WORKSPACE_CODE
          };

          let envFileContent = "";

          Object.entries(envVariables).forEach(([name, value]) => {
            envFileContent += `window.${name} = ${JSON.stringify(value)};\n`;
          });

          res.setHeader("Content-Type", "application/javascript");
          res.end(envFileContent);
        })
      );

      devServer.app?.use("/api", (req, res, next) => {
        getSession(credentials, session)
          .then((session) => {
            req.headers.authorization = `Bearer ${session?.accessToken}`;
            req.headers["Digma-Access-Token"] =
              `Token ${process.env.API_TOKEN}`;
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.error("Failed to enrich request with tokens", error);
          })
          .finally(() => {
            next();
          });
      });

      return middlewares;
    },
    static: {
      directory: path.resolve(__dirname, "./dist")
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          configFile: path.resolve(__dirname, "./tsconfig.dev.json"),
          getCustomTransformers: () => ({
            before: [styledComponentsTransformer]
          })
        }
      }
    ]
  }
};

export default config;
