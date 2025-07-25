import type { RouteObject } from "react-router";
import { Navigate, createBrowserRouter, useRouteError } from "react-router";
import { Admin } from "../../components/Admin";
import { Environments } from "../../components/Admin/Environments";
import { ErrorLinkResolver } from "../../components/Admin/ErrorLinkResolver";
import { Home } from "../../components/Admin/Home";
import { CodeIssues } from "../../components/Admin/Reports/CodeIssues";
import { SpanLinkResolver } from "../../components/Admin/SpanLinkResolver";
import { RejectedTraces } from "../../components/Admin/Troubleshooting/RejectedTraces";

export const routes: RouteObject[] = [
  {
    path: "/*",
    element: <Admin />,
    ErrorBoundary: () => {
      throw useRouteError();
    },
    children: [
      {
        index: true,
        element: <Navigate replace={true} to={"home"} />
      },
      { path: "home", element: <Home /> },
      {
        path: "reports",
        children: [
          {
            index: true,
            element: <Navigate replace={true} to={"code-issues"} />
          },
          {
            path: "code-issues",
            element: <CodeIssues />
          }
        ]
      },
      ...(window.isSandboxModeEnabled === true
        ? []
        : [
            {
              path: "environments",
              element: <Environments />
            }
          ]),
      {
        path: "troubleshooting",
        children: [
          {
            index: true,
            element: <Navigate replace={true} to={"rejected-traces"} />
          },
          {
            path: "rejected-traces",
            element: <RejectedTraces />
          }
        ]
      },
      { path: "navigate/errors/:id", element: <ErrorLinkResolver /> },
      { path: "navigate/:id", element: <SpanLinkResolver /> },
      {
        path: "*",
        element: <Navigate to={"/"} replace={true} />
      }
    ]
  }
];

const basename =
  document.querySelector("base")?.getAttribute("href") ?? undefined;

export const router = createBrowserRouter(routes, { basename });
