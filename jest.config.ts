import { createDefaultPreset, type JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  coverageDirectory: "coverage",
  coverageReporters: ["text-summary", "html"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.stories.tsx",
    "!src/**/*.d.ts"
  ],
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    globalsCleanup: "on"
  },
  transform: {
    ...createDefaultPreset().transform
  }
};

export default jestConfig;
