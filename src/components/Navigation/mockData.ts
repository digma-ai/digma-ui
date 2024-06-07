import { ROUTES } from "../../constants";
import { SetViewsPayload } from "./types";

export const mockedViewsData: SetViewsPayload = {
  views: [
    {
      title: "",
      id: ROUTES.HIGHLIGHTS,
      isSelected: true,
      isDisabled: false,
      hasNewData: false,
      isHidden: false,
      cardName: "highlights"
    },
    {
      isDisabled: false,
      isSelected: false,
      hasNewData: false,
      isHidden: false,
      title: "Issues",
      id: ROUTES.INSIGHTS,
      cardName: "insights"
    },
    {
      isDisabled: false,
      isSelected: false,
      hasNewData: false,
      isHidden: false,
      title: "Assets",
      id: ROUTES.ASSETS,
      cardName: "assets"
    },
    {
      isDisabled: false,
      isSelected: false,
      hasNewData: false,
      isHidden: false,
      title: "Analytics",
      id: ROUTES.ANALYTICS,
      cardName: "analytics"
    },
    {
      isDisabled: false,
      isSelected: false,
      hasNewData: false,
      isHidden: false,
      title: "Errors",
      id: ROUTES.ERRORS,
      cardName: "errors"
    },
    {
      isDisabled: false,
      isSelected: false,
      hasNewData: false,
      isHidden: true,
      title: "Error Details",
      id: ROUTES.ERRORS,
      path: "1",
      cardName: "errors"
    },
    {
      isDisabled: false,
      isSelected: false,
      hasNewData: false,
      isHidden: false,
      title: "Tests",
      id: ROUTES.TESTS,
      cardName: "tests"
    }
  ],
  createHistoryStep: false
};
