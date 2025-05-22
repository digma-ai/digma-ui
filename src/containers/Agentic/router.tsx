import type { RouteObject } from "react-router";
import { createBrowserRouter, useRouteError } from "react-router";
import { Agentic } from "../../components/Agentic";

export const routes: RouteObject[] = [
  {
    path: "/*",
    element: <Agentic />,
    ErrorBoundary: () => {
      throw useRouteError();
    }
  }
];

const basename =
  document.querySelector("base")?.getAttribute("href") ?? undefined;

export const router = createBrowserRouter(routes, { basename });
