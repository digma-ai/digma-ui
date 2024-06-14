import path from "path";

export const entries: AppEntries = {
  dashboard: {
    entry: path.resolve(__dirname, "./src/containers/Dashboard/index.tsx"),
    environmentVariables: ["dashboardRefreshInterval", "dashboardEnvironment"]
  },
  documentation: {
    entry: path.resolve(__dirname, "./src/containers/Documentation/index.tsx"),
    environmentVariables: ["documentationPage"]
  },
  installationWizard: {
    entry: path.resolve(
      __dirname,
      "./src/containers/InstallationWizard/index.tsx"
    ),
    environmentVariables: ["wizardFirstLaunch", "wizardSkipInstallationStep"]
  },
  main: {
    entry: path.resolve(__dirname, "./src/containers/Main/index.tsx"),
    environmentVariables: [
      "assetsRefreshInterval",
      "insightsRefreshInterval",
      "testsRefreshInterval"
    ]
  },
  // notifications: {
  //   entry: path.resolve(__dirname, "./src/containers/Notifications/index.tsx"),
  //   environmentVariables: [
  //     "notificationsRefreshInterval",
  //     "notificationsViewMode"
  //   ]
  // },
  recentActivity: {
    entry: path.resolve(__dirname, "./src/containers/RecentActivity/index.tsx"),
    environmentVariables: [
      "recentActivityExpirationLimit",
      "recentActivityDocumentationURL"
    ]
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
