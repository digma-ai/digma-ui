import axios from "axios";
import { isString } from "../../typeGuards/isString";
import type {
  IntellijPluginInfo,
  VSCodeExtensionInfo,
  VSCodeIdeScanningResult
} from "./types";

const PORT_RANGES_TO_SCAN = [
  [33100, 33119], // VS Code
  [33200, 33219], // Cursor
  [33300, 33319], // Windsurf
  [33400, 33419] // Unknown VS Code fork
];

const ABOUT_PATH = "api/digma/about";

export const scanRunningVSCodeIdeProjects =
  async (): Promise<VSCodeIdeScanningResult> => {
    const instances = PORT_RANGES_TO_SCAN.flatMap(([start, end]) =>
      Array.from({ length: end - start + 1 }, (_, i) => start + i)
    ).map((port) => ({
      port,
      url: `http://localhost:${port}/${ABOUT_PATH}`
    }));

    const responses = await Promise.allSettled(
      instances.map((x) =>
        axios
          .get<IntellijPluginInfo>(x.url)
          .then((response) => ({ port: x.port, response: response.data }))
          .catch((error) => ({
            port: x.port,
            response: axios.isAxiosError(error)
              ? `${error.message}`
              : "Unknown error"
          }))
      )
    );

    const successfulResponses = responses.filter(
      (x) => x.status === "fulfilled" && !isString(x.value.response)
    ) as unknown as PromiseFulfilledResult<{
      port: number;
      response: VSCodeExtensionInfo;
    }>[];

    return successfulResponses.map((x) => x.value);
  };
