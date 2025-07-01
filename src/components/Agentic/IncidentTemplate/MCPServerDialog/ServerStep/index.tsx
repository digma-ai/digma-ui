import { json } from "@codemirror/lang-json";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView } from "@codemirror/view";
import CodeMirror from "@uiw/react-codemirror";
import { useTheme } from "styled-components";
import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import { getCodeFontFamilyValue } from "../../../../common/App/styles";
import { NewButton } from "../../../../common/v3/NewButton";
import { trackingEvents } from "../../../tracking";
import { Footer } from "../Footer";
import * as s from "./styles";
import type { ServerStepProps } from "./types";

const PLACEHOLDER_TEXT = JSON.stringify(
  {
    weather: {
      transport: "stdio",
      command: "npx",
      args: ["-y", "@h1deya/mcp-server-weather"]
    }
  },
  null,
  2
);

export const ServerStep = ({
  onConnect,
  connectionSettings,
  onConnectionSettingsChange,
  isLoading,
  error
}: ServerStepProps) => {
  const theme = useTheme();

  const codeMirrorTheme = EditorView.theme({
    "&": {
      padding: "24px",
      borderRadius: "8px",
      fontFamily: getCodeFontFamilyValue(theme.codeFont),
      fontSize: "14px",
      fontWeight: "500",
      backgroundColor: "#000 !important"
    },
    ".cm-scroller": {
      overflow: "auto"
    }
  });

  const handleConnectButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.INCIDENT_TEMPLATE_ADD_MCP_DIALOG_CONNECT_BUTTON_CLICKED
    );
    onConnect(connectionSettings);
  };

  const isConnectButtonEnabled =
    connectionSettings.trim().length > 0 && !isLoading;

  return (
    <s.Container>
      <CodeMirror
        value={connectionSettings}
        onChange={onConnectionSettingsChange}
        extensions={[codeMirrorTheme, EditorView.lineWrapping, json()]}
        placeholder={PLACEHOLDER_TEXT}
        theme={oneDark}
        height={"343px"}
        basicSetup={{
          lineNumbers: false,
          foldGutter: false,
          allowMultipleSelections: false,
          rectangularSelection: false,
          highlightActiveLine: false,
          highlightSelectionMatches: false,
          closeBracketsKeymap: false,
          searchKeymap: false,
          foldKeymap: false,
          completionKeymap: false,
          lintKeymap: false
        }}
      />
      <Footer
        isLoading={isLoading}
        errorMessage={error}
        loadingMessage={"Connecting..."}
        buttons={
          <NewButton
            label={"Connect"}
            onClick={handleConnectButtonClick}
            isDisabled={!isConnectButtonEnabled}
          />
        }
      />
    </s.Container>
  );
};
