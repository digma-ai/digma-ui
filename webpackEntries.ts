import path from "path";

export const entries = {
  assets: path.resolve(__dirname, "./src/containers/Assets/index.tsx"),
  dashboard: path.resolve(__dirname, "./src/containers/Dashboard/index.tsx"),
  documentation: path.resolve(
    __dirname,
    "./src/containers/Documentation/index.tsx"
  ),
  insights: path.resolve(__dirname, "./src/containers/Insights/index.tsx"),
  installationWizard: path.resolve(
    __dirname,
    "./src/containers/InstallationWizard/index.tsx"
  ),
  notifications: path.resolve(
    __dirname,
    "./src/containers/Notifications/index.tsx"
  ),
  recentActivity: path.resolve(
    __dirname,
    "./src/containers/RecentActivity/index.tsx"
  ),
  troubleshooting: path.resolve(
    __dirname,
    "./src/containers/Troubleshooting/index.tsx"
  )
};

export type WebpackEnv = {
  WEBPACK_BUNDLE: true;
  WEBPACK_BUILD: true;
  app?: keyof typeof entries;
};
