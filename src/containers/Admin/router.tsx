import type { RouteObject } from "react-router-dom";
import { Navigate, createBrowserRouter } from "react-router-dom";
import { Admin } from "../../components/Admin";
import { Home } from "../../components/Admin/Home";
import { CodeIssues } from "../../components/Admin/Reports/CodeIssues";

export const routes: RouteObject[] = [
  {
    path: "/*",
    element: <Admin />,
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
