import type { ErrorListItem } from "../../../redux/services/types";

export const mockedGlobalErrorData: ErrorListItem = {
  id: "034b64a4-83de-11ef-bc2a-0242ac160003",
  errorType: "java.util.InvalidPropertiesFormatException",
  fromDisplayName: "Check",
  fromFullyQualifiedName: "Check",
  fromCodeObjectId:
    "method:org.springframework.samples.petclinic.sample.Utils$_$Check",
  status: "Recent, 2 days ago",
  firstDetected: "2024-10-06T12:24:19.559229Z",
  lastDetected: "2024-10-06T12:57:46.864939Z",
  affectedEndpoints: [
    {
      displayName:
        "HTTP GET /SampleInsights/VeryLongLongLongLongLongLongUnHandledError6",
      service: "spring-petclinic.main",
      spanCodeObjectId:
        "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /SampleInsights/UnHandledError6"
    },
    {
      displayName: "monitor",
      service: "service2",
      spanCodeObjectId: "span:MonitorService$_$monitor"
    },
    {
      displayName: "monitor",
      service: "spring-petclinic.main",
      spanCodeObjectId: "span:MonitorService$_$monitor"
    }
  ],
  score: {
    score: 63,
    scoreParams: {
      Occurrences: 3,
      Trend: 0,
      Recent: 10,
      Unhandled: 50
    }
  },
  unexpected: false
};
