import type { RouteObject } from "react-router";
import { createBrowserRouter, useRouteError } from "react-router";
import { IdeLauncher } from "../../components/IdeLauncher";
import { ProjectOpener } from "../../components/IdeLauncher/ProjectOpener";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <IdeLauncher />,
    ErrorBoundary: () => {
      throw useRouteError();
    },
    children: [
      {
        index: true,
        element: <ProjectOpener />
      }
    ]
  }
];

const basename =
  document.querySelector("base")?.getAttribute("href") ?? undefined;

export const router = createBrowserRouter(routes, { basename });
