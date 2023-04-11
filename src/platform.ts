import { IDE, Platform } from "./globals";

const PLATFORMS = ["JetBrains", "VS Code", "Other"];

const isPlatform = (platform: unknown): platform is Platform =>
  typeof platform === "string" && PLATFORMS.includes(platform);

export const getPlatform = (platform: unknown): Platform =>
  isPlatform(platform) ? platform : "Other";

export const platform = getPlatform(window.platform);

const IDES = ["IntelliJ IDEA", "Rider", "PyCharm"];

const isIDE = (ide: unknown): ide is IDE =>
  typeof ide === "string" && IDES.includes(ide);

export const getIDE = (ide: unknown): IDE | undefined =>
  isIDE(ide) ? ide : undefined;

export const ide = getIDE(window.ide);
