import path from "path";

export const appData: AppData = {
  admin: {
    entry: path.resolve(__dirname, "./src/containers/Admin/index.tsx"),
    platforms: ["Web"]
  },
  dashboard: {
    entry: path.resolve(__dirname, "./src/containers/Dashboard/index.tsx"),
    environmentVariables: ["dashboardEnvironment"],
    platforms: ["JetBrains", "Visual Studio"]
  },
  documentation: {
    entry: path.resolve(__dirname, "./src/containers/Documentation/index.tsx"),
    environmentVariables: ["documentationPage"],
    platforms: ["JetBrains"]
  },
  ["ide-launcher"]: {
    entry: path.resolve(__dirname, "./src/containers/IdeLauncher/index.tsx"),
    platforms: ["Web"]
  },
  login: {
    entry: path.resolve(__dirname, "./src/containers/Login/index.tsx"),
    platforms: ["Web"]
  },
  ["installation-wizard"]: {
    entry: path.resolve(
      __dirname,
      "./src/containers/InstallationWizard/index.tsx"
    ),
    environmentVariables: ["wizardFirstLaunch", "wizardSkipInstallationStep"],
    platforms: ["JetBrains"]
  },
  main: {
    entry: path.resolve(__dirname, "./src/containers/Main/index.tsx"),
    platforms: ["JetBrains", "Visual Studio"]
  },
  // /** @deprecated */
  // notifications: {
  //   entry: path.resolve(__dirname, "./src/containers/Notifications/index.tsx"),
  //   environmentVariables: [
  //     "notificationsViewMode"
  //   ],
  //   platforms: ["JetBrains"]
  // },
  ["recent-activity"]: {
    entry: path.resolve(__dirname, "./src/containers/RecentActivity/index.tsx"),
    environmentVariables: ["recentActivityExpirationLimit"],
    platforms: ["JetBrains"]
  },
  troubleshooting: {
    entry: path.resolve(
      __dirname,
      "./src/containers/Troubleshooting/index.tsx"
    ),
    platforms: ["JetBrains"]
  }
};

type AppData = Record<
  string,
  { entry: string; environmentVariables?: string[]; platforms: string[] }
>;

export interface WebpackEnv {
  WEBPACK_BUNDLE: true;
  WEBPACK_BUILD: true;
  PLATFORM?: string;
  ZIP?: boolean;
  ["ZIP_FILE_FORMAT"]?: string;
}
