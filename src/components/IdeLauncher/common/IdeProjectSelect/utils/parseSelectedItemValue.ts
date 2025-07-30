import { SELECT_VALUE_DELIMITER } from "../constants";

export const parseSelectedItemValue = (value: string) => {
  const [port, project] = value.split(SELECT_VALUE_DELIMITER);
  return { port: Number(port), project };
};
