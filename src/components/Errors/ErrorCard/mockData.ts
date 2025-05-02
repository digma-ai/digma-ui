import type { Error } from "../../../redux/services/types";

export const mockedError: Error = {
  uid: "1",
  name: "Very long long long long long long long error name",
  scoreInfo: {
    score: 100,
    scoreParams: {
      param1: 1,
      param2: 2
    }
  },
  codeObjectId: "codeObjectId1",
  sourceCodeObjectId: "test$_$sourceCodeObjectId1",
  startsHere: false,
  endsHere: false,
  latestTraceId: "latestTraceId1",
  firstOccurenceTime: "2021-01-01T00:00:00.000Z",
  lastOccurenceTime: "2024-01-01T00:00:00.000Z",
  characteristic: "characteristic1"
};
