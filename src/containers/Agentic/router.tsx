import type { RouteObject } from "react-router";
import { createBrowserRouter, Navigate, useRouteError } from "react-router";
import { Agentic } from "../../components/Agentic";
import { IncidentDetails } from "../../components/Agentic/IncidentDetails";
import { Incidents } from "../../components/Agentic/Incidents";
import { IncidentsContainer } from "../../components/Agentic/IncidentsContainer";
import { IncidentTemplate } from "../../components/Agentic/IncidentTemplate";

export const routes: RouteObject[] = [
  {
    path: "/*",
    element: <Agentic />,
    ErrorBoundary: () => {
      throw useRouteError();
    },
    children: [
      {
        index: true,
        element: <Navigate replace={true} to={"incidents"} />
      },
      {
        path: "incidents",
        element: <IncidentsContainer />,
        children: [
          {
            index: true,
            element: <Incidents />
          },
          { path: "template", element: <IncidentTemplate /> },
          {
            path: ":id",
            element: <IncidentDetails />
          }
        ]
      },
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
