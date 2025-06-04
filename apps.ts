import path from "path";

type Platform = "jetbrains" | "web" | "vs";

export const appData: AppData = {
  admin: {
    entry: path.resolve(__dirname, "./src/containers/Admin/index.tsx"),
    platforms: ["web"]
  },
  agentic: {
    entry: path.resolve(__dirname, "./src/containers/Agentic/index.tsx"),
    platforms: ["web"]
  },
  dashboard: {
    entry: path.resolve(__dirname, "./src/containers/Dashboard/index.tsx"),
    environmentVariables: ["dashboardEnvironment"],
    platforms: ["jetbrains", "vs"]
  },
  documentation: {
    entry: path.resolve(__dirname, "./src/containers/Documentation/index.tsx"),
    environmentVariables: ["documentationPage"],
    platforms: ["jetbrains"]
  },
  ["email-confirmation"]: {
    entry: path.resolve(
      __dirname,
      "./src/containers/EmailConfirmation/index.tsx"
    ),
    platforms: ["web"]
  },
  ["ide-launcher"]: {
    entry: path.resolve(__dirname, "./src/containers/IdeLauncher/index.tsx"),
    platforms: ["web"]
  },
  login: {
    entry: path.resolve(__dirname, "./src/containers/Login/index.tsx"),
    platforms: ["web"]
  },
  ["installation-wizard"]: {
    entry: path.resolve(
      __dirname,
      "./src/containers/InstallationWizard/index.tsx"
    ),
    environmentVariables: ["wizardFirstLaunch", "wizardSkipInstallationStep"],
    platforms: ["jetbrains"]
  },
  main: {
    entry: path.resolve(__dirname, "./src/containers/Main/index.tsx"),
    platforms: ["jetbrains", "vs"]
  },
  // /** @deprecated */
  // notifications: {
  //   entry: path.resolve(__dirname, "./src/containers/Notifications/index.tsx"),
  //   environmentVariables: [
  //     "notificationsViewMode"
  //   ],
  //   platforms: ["jetbrains"]
  // },
  ["recent-activity"]: {
    entry: path.resolve(__dirname, "./src/containers/RecentActivity/index.tsx"),
    environmentVariables: ["recentActivityExpirationLimit"],
    platforms: ["jetbrains"]
  },
  troubleshooting: {
    entry: path.resolve(
      __dirname,
      "./src/containers/Troubleshooting/index.tsx"
    ),
    platforms: ["jetbrains"]
  }
};

type AppData = Record<
  string,
  { entry: string; environmentVariables?: string[]; platforms: string[] }
>;

export interface WebpackEnv {
  WEBPACK_BUNDLE: true;
  WEBPACK_BUILD: true;
  PLATFORM?: Platform;
  ZIP?: boolean;
  ["ZIP_FILE_FORMAT"]?: string;
}
