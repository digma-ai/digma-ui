export type OperatingSystem = "Linux" | "macOS" | "Windows" | "Other";

export const getOperatingSystem = (): OperatingSystem => {
  if (navigator.userAgent.includes("Linux")) {
    return "Linux";
  }

  if (navigator.userAgent.includes("Macintosh")) {
    return "macOS";
  }

  if (navigator.userAgent.includes("Windows")) {
    return "Windows";
  }

  return "Other";
};

export const os = getOperatingSystem();
