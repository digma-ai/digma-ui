import axios from "axios";
import { isString } from "../../typeGuards/isString";
import { PluginInfo } from "./types";

const DEFAULT_PORT = 63342;
const PORT_RANGE = 20;
const ABOUT_PATH = "api/digma/about";

export const scanIDEs = async () => {
  const instances = Array.from(
    { length: PORT_RANGE },
    (_, i) => DEFAULT_PORT + i
  ).map((port) => ({
    port,
    url: `http://localhost:${port}/${ABOUT_PATH}`
  }));

  const responses = await Promise.allSettled(
    instances.map((x) =>
      axios
        .get<PluginInfo>(x.url)
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
    (x) => x.status === "fulfilled" && !isString(x.value)
  ) as unknown as PromiseFulfilledResult<{
    port: number;
    response: PluginInfo;
  }>[];

  return successfulResponses.map((x) => x.value);
};
