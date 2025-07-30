import { APP_ID } from "../../containers/IdeLauncher/constants";
import { addPrefix } from "../../utils/addPrefix";

export const trackingEvents = addPrefix(
  APP_ID,
  {
    IDE_PROJECT_SELECTED: "ide project selected",
    TRY_SCANNING_AGAIN_BUTTON_CLICKED: "try scanning again button clicked",
    TRY_AGAIN_BUTTON_CLICKED: "try again button clicked",
    GET_DIGMA_BUTTON_CLICKED: "get digma button clicked",
    IDE_PROJECT_OPEN_RESULT_RECEIVED: "ide project open result received",
    IDE_CHAT_CONTEXT_FILE_RESULT_RECEIVED:
      "ide chat context file result received"
  },
  " "
);
