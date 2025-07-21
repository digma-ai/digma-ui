import { APP_ID } from "../../containers/Admin/constants";
import { addPrefix } from "../../utils/addPrefix";

export const trackingEvents = addPrefix(
  APP_ID,
  {
    SIDEBAR_LOGO_LINK_CLICKED: "sidebar logo link clicked",
    SIDEBAR_USER_MENU_OPEN_CHANGED: "sidebar user menu open changed",
    SIDEBAR_USER_MENU_ITEM_CLICKED: "sidebar user menu item clicked",
    SIDEBAR_INCIDENTS_LIST_ITEM_CLICKED: "sidebar incidents list item clicked",
    SIDEBAR_CREATE_BUTTON_CLICKED: "sidebar create button clicked",
    SIDEBAR_LINK_BUTTON_CLICKED: "sidebar link button clicked",
    INCIDENT_CREATION_CHAT_DIALOG_CLOSED:
      "incident creation chat dialog closed",
    VIEW_NEW_INCIDENT_LINK_CLICKED: "view incident link clicked",
    FLOW_CHART_NODE_CLICKED: "flow chart node clicked",
    FLOW_CHART_NODE_KEBAB_MENU_CLICKED: "flow chart node kebab menu clicked",
    FLOW_CHART_NODE_KEBAB_MENU_ITEM_CLICKED:
      "flow chart node kebab menu item clicked",
    FLOW_CHART_NODE_MCP_TOOLBAR_SERVER_ICON_CLICKED:
      "flow chart node mcp toolbar server icon clicked",
    FLOW_CHART_NODE_MCP_TOOLBAR_SERVER_ICON_MENU_ITEM_CLICKED:
      "flow chart node mcp toolbar server icon menu item clicked",
    AGENT_FLOW_CHART_NODE_ADD_MCP_SERVER_BUTTON_CLICKED:
      "flow chart node add mcp server button clicked",
    INCIDENT_TEMPLATE_ADD_MCP_DIALOG_CONNECT_BUTTON_CLICKED:
      "incident template add mcp dialog connect button clicked",
    INCIDENT_TEMPLATE_ADD_MCP_DIALOG_CANCEL_BUTTON_CLICKED:
      "incident template add mcp dialog cancel button clicked",
    INCIDENT_TEMPLATE_ADD_MCP_DIALOG_CLOSED:
      "incident template add mcp dialog closed",
    INCIDENT_TEMPLATE_EDIT_MCP_DIALOG_OPENED:
      "incident template edit mcp dialog opened",
    INCIDENT_TEMPLATE_EDIT_MCP_DIALOG_SAVE_BUTTON_CLICKED:
      "incident template edit mcp dialog save button clicked",
    INCIDENT_TEMPLATE_EDIT_MCP_DIALOG_CANCEL_BUTTON_CLICKED:
      "incident template edit mcp dialog cancel button clicked",
    INCIDENT_TEMPLATE_EDIT_MCP_DIALOG_CLOSE_BUTTON_CLICKED:
      "incident template edit mcp dialog close button clicked",
    INCIDENT_TEMPLATE_EDIT_MCP_DIALOG_SELECT_ALL_TOGGLE_CHANGED:
      "incident template edit mcp dialog select all toggle changed",
    INCIDENT_TEMPLATE_EDIT_MCP_DIALOG_TOOL_TAG_CLICKED:
      "incident template edit mcp dialog tool tag clicked",
    INCIDENT_HOME_BREADCRUMB_CLICKED: "incident home breadcrumb clicked",
    INCIDENT_AGENT_INFO_BUTTON_CLICKED: "incident agent info button clicked",
    INCIDENT_AGENT_VIEW_MODE_TOGGLE_CHANGED:
      "incident agent view mode toggle changed",
    INCIDENT_AGENT_MESSAGE_SUBMITTED: "incident agent message submitted",
    INCIDENT_RELATED_ASSETS_TAB_CLICKED: "incident related assets tab clicked",
    INCIDENT_RELATED_ISSUES_TABLE_ITEM_LINK_CLICKED:
      "incident related issues table item link clicked",
    INCIDENT_ARTIFACTS_TABLE_ITEM_LINK_CLICKED:
      "incident artifacts table item link clicked"
  },
  " "
);
