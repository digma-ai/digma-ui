import axios, { isAxiosError } from "axios";
import type { ShowIdeProjectResult } from "./types";

export const showIdeProject = async (
  port: number,
  project: string,
  params: Record<string, string>
): Promise<ShowIdeProjectResult> => {
  const pluginParams = Object.entries(params).reduce((acc, [key, value]) => {
    const KEY_PREFIX = "plugin.";
    if (key.startsWith(KEY_PREFIX)) {
      const newKey = key.replace(KEY_PREFIX, "");
      acc[newKey] = value;
    }

    return acc;
  }, {} as Record<string, string>);

  try {
    await axios.get(`http://localhost:${port}/api/digma/show`, {
      params: { ...pluginParams, projectName: project }
    });
    return { result: "success" };
  } catch (error) {
    return {
      result: "failure",
      error: {
        message: isAxiosError(error)
          ? error.message
          : "Failed to open IDE project"
      }
    };
  }
};
