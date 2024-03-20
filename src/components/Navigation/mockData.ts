import { SetViewsPayload } from "./types";

export const mockedViewsData: SetViewsPayload = {
  views: [
    {
      isDisabled: false,
      isSelected: true,
      hasNewData: false,
      isHidden: false,
      title: "Issues",
      id: "insights",
      cardName: "insights"
    },
    {
      isDisabled: false,
      isSelected: false,
      hasNewData: false,
      isHidden: false,
      title: "Assets",
      id: "assets",
      cardName: "assets"
    },
    {
      isDisabled: false,
      isSelected: false,
      hasNewData: false,
      isHidden: false,
      title: "Analytics",
      id: "analytics",
      cardName: "analytics"
    },
    {
      isDisabled: false,
      isSelected: false,
      hasNewData: false,
      isHidden: false,
      title: "Errors",
      id: "errors",
      cardName: "errors"
    },
    {
      isDisabled: false,
      isSelected: false,
      hasNewData: false,
      isHidden: true,
      title: "Error Details",
      id: "errorsDetails",
      cardName: "errors"
    },
    {
      isDisabled: false,
      isSelected: false,
      hasNewData: false,
      isHidden: false,
      title: "Tests",
      id: "tests",
      cardName: "tests"
    }
  ],
  isTriggeredByJcef: false
};
