import { ServiceMetricsReport } from "../types";

export const mockedReport: ServiceMetricsReport = {
  reports: [
    {
      impact: 100,
      key: {
        environment: "TEST",
        service: "Transactions",
        lastDays: null
      },
      issues: 10
    },
    {
      impact: 10,
      key: {
        environment: "TEST",
        service: "API",
        lastDays: null
      },
      issues: 10
    },
    {
      impact: 101,
      key: {
        environment: "TEST",
        service: "Orders",
        lastDays: null
      },
      issues: 30
    },
    {
      impact: 120,
      key: {
        environment: "TEST",
        service: "Users",
        lastDays: null
      },
      issues: 110
    },
    {
      impact: 120,
      key: {
        environment: "TEST",
        service: "Users",
        lastDays: null
      },
      issues: 110
    },
    {
      impact: 120,
      key: {
        environment: "TEST",
        service: "Users",
        lastDays: null
      },
      issues: 110
    },
    {
      impact: 120,
      key: {
        environment: "TEST",
        service: "Users",
        lastDays: null
      },
      issues: 110
    }
  ]
};
