import { FrameStack, SetErrorDetailsPayload } from "./types";

export const mockedFrameStack: FrameStack = {
  exceptionType: "exceptionType1",
  frames: [
    {
      moduleName: "moduleName1",
      functionName: "functionName1",
      lineNumber: 1,
      executedCode: "executedCode1",
      codeObjectId: "codeObjectId1",
      parameters: [
        {
          paramName: "paramName1",
          alwaysNoneValue: false
        }
      ],
      repeat: 1,
      spanName: "veryLongLongLongLongLongLongSpanName1",
      spanKind: "spanKind1",
      moduleLogicalPath: "moduleLogicalPath1",
      modulePhysicalPath: "modulePhysicalPath1",
      className: "className1"
    }
  ],
  exceptionMessage: "exceptionMessage1"
};

export const mockedErrorDetails: SetErrorDetailsPayload = {
  details: {
    name: "Very long long long long long long long long long long long error name",
    sourceCodeObjectId: "test$_$VeryLongLongLongLongSourceCodeObjectId1",
    latestTraceId: "latestTraceId1",
    firstOccurenceTime: "2021-01-01T00:00:00.000Z",
    lastOccurenceTime: "2024-01-01T00:00:00.000Z",
    dayAvg: 1,
    scoreInfo: {
      score: 90,
      scoreParams: {
        param1: "value1"
      }
    },
    errors: [
      {
        frameStacks: [
          mockedFrameStack,
          mockedFrameStack,
          mockedFrameStack,
          mockedFrameStack,
          mockedFrameStack,
          mockedFrameStack
        ],
        stackTrace: "stackTrace1",
        lastInstanceCommitId: "lastInstanceCommitId1",
        latestTraceId: "latestTraceId1"
      },
      {
        frameStacks: [mockedFrameStack, mockedFrameStack],
        stackTrace: "stackTrace1",
        lastInstanceCommitId: "lastInstanceCommitId1",
        latestTraceId: "latestTraceId1"
      }
    ],
    originServices: [
      {
        serviceName: "serviceName1"
      }
    ]
  }
};
