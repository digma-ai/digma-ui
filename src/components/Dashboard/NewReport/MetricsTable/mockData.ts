import { ServiceMetricsReport } from "../types";

export const mockedReport: ServiceMetricsReport = {
  reports: [
    {
      impact: 100.123123,
      criticality: 100.123123,
      key: {
        environment: "TEST",
        service: "Transactions",
        lastDays: null
      },
      issues: 10
    },
    {
      impact: 50,
      criticality: 50,
      key: {
        environment: "TEST",
        service: "API",
        lastDays: null
      },
      issues: 10
    },
    {
      impact: 1,
      criticality: 1,
      key: {
        environment: "TEST",
        service: "Orders",
        lastDays: null
      },
      issues: 30
    },
    {
      impact: 120,
      criticality: 120,
      key: {
        environment: "TEST",
        service: "Users",
        lastDays: null
      },
      issues: 110
    },
    {
      impact: 120,
      criticality: 120,
      key: {
        environment: "TEST",
        service: "Users1",
        lastDays: null
      },
      issues: 110
    },
    {
      impact: 70,
      criticality: 70,
      key: {
        environment: "TEST",
        service: "Users2",
        lastDays: null
      },
      issues: 70
    },
    {
      impact: 99.1231,
      criticality: 99.1231,
      key: {
        environment: "TEST",
        service: "Users3",
        lastDays: null
      },
      issues: 110
    }
  ]
};
