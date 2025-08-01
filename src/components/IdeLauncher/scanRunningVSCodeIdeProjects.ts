import axios from "axios";
import { isString } from "../../typeGuards/isString";
import type {
  IntellijPluginInfo,
  VSCodeExtensionInfo,
  VSCodeIdeScanningResult
} from "./types";

const START_PORT_TO_SCAN = 33100;
const END_PORT_TO_SCAN = 33119;

const ABOUT_PATH = "api/digma/about";

export const scanRunningVSCodeIdeProjects =
  async (): Promise<VSCodeIdeScanningResult> => {
    const instances = Array.from(
      { length: END_PORT_TO_SCAN - START_PORT_TO_SCAN + 1 },
      (_, i) => START_PORT_TO_SCAN + i
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
