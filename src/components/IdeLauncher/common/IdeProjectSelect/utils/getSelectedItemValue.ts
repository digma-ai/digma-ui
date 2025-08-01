import { SELECT_VALUE_DELIMITER } from "../constants";

export const getSelectItemValue = (port: number, project: string) =>
  `${port}${SELECT_VALUE_DELIMITER}${project}`;
