import type { Environment } from "../../common/App/types";

export const mockedEnvironments: Environment[] = new Array(35)
  .fill(5)
  .map((_, i) => {
    const id = `ENV${i + 1}`;
    return { id, name: id, type: "Private" };
  });
