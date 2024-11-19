import path from "path";

export const entries: AppEntries = {
  dashboard: {
    entry: path.resolve(__dirname, "./src/containers/Dashboard/index.tsx"),
    environmentVariables: ["dashboardEnvironment"]
  },
  documentation: {
    entry: path.resolve(__dirname, "./src/containers/Documentation/index.tsx"),
    environmentVariables: ["documentationPage"]
  },
  ideLauncher: {
    entry: path.resolve(__dirname, "./src/containers/IdeLauncher/index.tsx")
  },
  installationWizard: {
    entry: path.resolve(
      __dirname,
      "./src/containers/InstallationWizard/index.tsx"
    ),
    environmentVariables: ["wizardFirstLaunch", "wizardSkipInstallationStep"]
  },
  main: {
    entry: path.resolve(__dirname, "./src/containers/Main/index.tsx")
  },
  // /** @deprecated */
  // notifications: {
  //   entry: path.resolve(__dirname, "./src/containers/Notifications/index.tsx"),
  //   environmentVariables: [
  //     "notificationsViewMode"
  //   ]
  // },
  recentActivity: {
    entry: path.resolve(__dirname, "./src/containers/RecentActivity/index.tsx"),
    environmentVariables: ["recentActivityExpirationLimit"]
  },
  troubleshooting: {
    entry: path.resolve(__dirname, "./src/containers/Troubleshooting/index.tsx")
  }
};

type AppEntries = Record<
  string,
  { entry: string; environmentVariables?: string[] }
>;

export interface WebpackEnv {
  WEBPACK_BUNDLE: true;
  WEBPACK_BUILD: true;
  app?: keyof typeof entries;
  platform?: string;
}
