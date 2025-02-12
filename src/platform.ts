import type { IDE, Platform } from "./globals";
import { isString } from "./typeGuards/isString";

const PLATFORMS = ["JetBrains", "VS Code", "Visual Studio", "Web"];

const isPlatform = (platform: unknown): platform is Platform =>
  isString(platform) && PLATFORMS.includes(platform);

const getPlatform = (platform: unknown): Platform | null =>
  isPlatform(platform) ? platform : null;

export const platform = getPlatform(window.platform);

const IDES = ["IDEA", "Rider", "PyCharm"];

const isIDE = (ide: unknown): ide is IDE => isString(ide) && IDES.includes(ide);

const getIDE = (ide: unknown): IDE | undefined =>
  isIDE(ide) ? ide : undefined;

export const ide = getIDE(window.ide);
