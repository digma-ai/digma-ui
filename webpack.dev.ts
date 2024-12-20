import axios from "axios";
import dotenv from "dotenv";
import https from "https";
import path from "path";
import createStyledComponentsTransformer from "typescript-plugin-styled-components";
import type { WebpackConfiguration } from "webpack-dev-server";

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

dotenv.config();

if (!process.env.USERNAME || !process.env.PASSWORD) {
  throw new Error("Username and password must be provided");
}

let session: Session | undefined;

const credentials: Credentials = {
  username: process.env.USERNAME,
  password: process.env.PASSWORD
};

const apiProxyClient = axios.create({
  baseURL: process.env.API_BASE_URL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

const login = async ({ username, password }: Credentials) => {
  const response = await apiProxyClient.post<{
    accessToken: string;
    refreshToken: string;
    expiration: string;
    userId: string;
  }>("/authentication/login", {
    username,
    password
  });

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

const config: WebpackConfiguration = {
  extends: path.resolve(__dirname, "./webpack.common.ts"),
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    port: 3000,
    proxy: [
      {
        context: ["/api"],
        target: process.env.API_BASE_URL,
        pathRewrite: { "^/api": "" },
        secure: false
      }
    ],
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error("webpack-dev-server is not defined");
      }

      devServer.app?.use("/api", (req, res, next) => {
        getSession(credentials, session)
          .then((session) => {
            req.headers.authorization = `Bearer ${session?.accessToken}`;
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.error("Failed to enrich request with token", error);
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
