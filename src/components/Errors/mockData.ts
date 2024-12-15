import { mockedError } from "./ErrorCard/mockData";
import type { SetErrorsDataPayload } from "./types";

export const mockedErrorsData: SetErrorsDataPayload = {
  errors: [
    mockedError,
    { ...mockedError, uid: "2", scoreInfo: { score: 70, scoreParams: null } },
    { ...mockedError, uid: "3", scoreInfo: { score: 30, scoreParams: null } }
  ]
};
