import type { SetGlobalErrorsDataPayload } from "./types";

export const DefaultErrorList: SetGlobalErrorsDataPayload = {
  totalCount: 2,
  list: [
    {
      id: "0021a8de-9134-11ef-8040-0242ac130002",
      errorType: "java.lang.RuntimeException",
      fromDisplayName: "CrashController.triggerException",
      fromFullyQualifiedName:
        "org.springframework.samples.petclinic.system.CrashController.triggerException",
      fromCodeObjectId:
        "method:org.springframework.samples.petclinic.system.CrashController$_$triggerException",
      status: "Recent, 23 hours ago",
      firstDetected: "2024-10-23T11:43:01.798918Z",
      lastDetected: "2024-10-23T11:43:03.280678Z",
      affectedEndpoints: [
        {
          displayName: "HTTP GET /oups",
          service: "spring-petclinic",
          spanCodeObjectId: "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /oups"
        }
      ],
      score: {
        score: 70,
        scoreParams: {
          Occurrences: 0,
          Trend: 0,
          Recent: 20,
          Unhandled: 50
        }
      },
      unhandled: true
    },
    {
      id: "00219416-9134-11ef-82aa-0242ac130002",
      errorType:
        "org.springframework.web.servlet.resource.NoResourceFoundException",
      fromDisplayName: "ResourceHttpRequestHandler.handleRequest",
      fromFullyQualifiedName:
        "org.springframework.web.servlet.resource.ResourceHttpRequestHandler.handleRequest",
      fromCodeObjectId:
        "method:org.springframework.web.servlet.resource.ResourceHttpRequestHandler$_$handleRequest",
      status: "High number of errors",
      firstDetected: "2024-10-23T11:43:00.505243Z",
      lastDetected: "2024-10-23T12:36:16.873716Z",
      affectedEndpoints: [
        {
          displayName: "HTTP GET /webjars/**",
          service: "spring-petclinic",
          spanCodeObjectId:
            "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /webjars/**"
        }
      ],
      score: {
        score: 45,
        scoreParams: {
          Occurrences: 25,
          Trend: 0,
          Recent: 20,
          Unhandled: 0
        }
      },
      unhandled: false
    }
  ]
};

export const DismissedErrorList: SetGlobalErrorsDataPayload = {
  totalCount: 2,
  dismissedCount: 1,
  list: [
    {
      id: "0021a8de-9134-11ef-8040-0242ac130002",
      errorType: "java.lang.RuntimeException",
      fromDisplayName: "CrashController.triggerException",
      fromFullyQualifiedName:
        "org.springframework.samples.petclinic.system.CrashController.triggerException",
      fromCodeObjectId:
        "method:org.springframework.samples.petclinic.system.CrashController$_$triggerException",
      status: "Recent, 23 hours ago",
      firstDetected: "2024-10-23T11:43:01.798918Z",
      lastDetected: "2024-10-23T11:43:03.280678Z",
      affectedEndpoints: [
        {
          displayName: "HTTP GET /oups",
          service: "spring-petclinic",
          spanCodeObjectId: "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /oups"
        }
      ],
      score: {
        score: 70,
        scoreParams: {
          Occurrences: 0,
          Trend: 0,
          Recent: 20,
          Unhandled: 50
        }
      },
      unhandled: true
    }
  ]
};
