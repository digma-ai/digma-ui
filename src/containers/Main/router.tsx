import { Navigate, RouteObject, createHashRouter } from "react-router-dom";
import { Assets } from "../../components/Assets";
import { Errors } from "../../components/Errors";
import { Highlights } from "../../components/Highlights";
import { Insights } from "../../components/Insights";
import { Main } from "../../components/Main";
import { TAB_IDS } from "../../components/Navigation/Tabs/types";
import { Tests } from "../../components/Tests";
import { isEnvironment } from "../../typeGuards/isEnvironment";

const historyInitialState = {
  idx: 0,
  environmentId: isEnvironment(window.environment)
    ? window.environment.id
    : undefined
};

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: (
          <Navigate
            replace={true}
            to={TAB_IDS.ISSUES}
            state={historyInitialState}
          />
        )
      },
      { path: TAB_IDS.HIGHLIGHTS, element: <Highlights /> },
      {
        path: TAB_IDS.ISSUES,
        element: <Insights insightViewType={"Issues"} key={"issues"} />
      },
      {
        path: TAB_IDS.ASSETS,
        element: <Assets />,
        children: [
          {
            path: ":typeId",
            element: <Assets />
          }
        ]
      },
      {
        path: TAB_IDS.ANALYTICS,
        element: <Insights insightViewType={"Analytics"} key={"analytics"} />
      },
      {
        path: TAB_IDS.ERRORS,
        element: <Errors />,
        children: [
          {
            path: ":id",
            element: <Errors />
          }
        ]
      },
      { path: TAB_IDS.TESTS, element: <Tests /> }
    ]
  }
];

export const router = createHashRouter(routes);
