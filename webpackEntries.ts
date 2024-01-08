import path from "path";

export const entries: AppEntries = {
  assets: {
    entry: path.resolve(__dirname, "./src/containers/Assets/index.tsx"),
    environmentVariables: [
      "assetsRefreshInterval",
      "assetsSearch",
      "assetsSelectedServices"
    ]
  },
  dashboard: {
    entry: path.resolve(__dirname, "./src/containers/Dashboard/index.tsx"),
    environmentVariables: ["dashboardRefreshInterval", "dashboardEnvironment"]
  },
  documentation: {
    entry: path.resolve(__dirname, "./src/containers/Documentation/index.tsx"),
    environmentVariables: ["documentationPage"]
  },
  insights: {
    entry: path.resolve(__dirname, "./src/containers/Insights/index.tsx"),
    environmentVariables: ["insightsRefreshInterval"]
  },
  installationWizard: {
    entry: path.resolve(
      __dirname,
      "./src/containers/InstallationWizard/index.tsx"
    ),
    environmentVariables: ["wizardFirstLaunch", "wizardSkipInstallationStep"]
  },
  notifications: {
    entry: path.resolve(__dirname, "./src/containers/Notifications/index.tsx"),
    environmentVariables: [
      "notificationsRefreshInterval",
      "notificationsViewMode"
    ]
  },
  recentActivity: {
    entry: path.resolve(__dirname, "./src/containers/RecentActivity/index.tsx"),
    environmentVariables: [
      "recentActivityExpirationLimit",
      "recentActivityDocumentationURL",
      "recentActivityIsEnvironmentManagementEnabled"
    ]
  },
  tests: {
    entry: path.resolve(__dirname, "./src/containers/Tests/index.tsx")
  },
  troubleshooting: {
    entry: path.resolve(__dirname, "./src/containers/Troubleshooting/index.tsx")
  }
};

type AppEntries = Record<
  string,
  { entry: string; environmentVariables?: string[] }
>;

export type WebpackEnv = {
  WEBPACK_BUNDLE: true;
  WEBPACK_BUILD: true;
  app?: keyof typeof entries;
  platform?: string;
};
