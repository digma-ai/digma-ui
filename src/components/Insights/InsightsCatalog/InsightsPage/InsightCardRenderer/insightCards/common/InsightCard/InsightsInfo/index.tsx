import { openURLInDefaultBrowser } from "../../../../../../../../../utils/actions/openURLInDefaultBrowser";
import { sendUserActionTrackingEvent } from "../../../../../../../../../utils/actions/sendUserActionTrackingEvent";
import { CrossIcon } from "../../../../../../../../common/icons/12px/CrossIcon";
import { Tooltip } from "../../../../../../../../common/v3/Tooltip";
import { trackingEvents } from "../../../../../../../tracking";
import * as s from "./styles";
import type { InsightsInfoProps } from "./types";

export const InsightsInfo = ({
  isOpen,
  children,
  description: Description,
  documentationLink,
  onClose
}: InsightsInfoProps) => {
  const handleOpenDocsClick = () => {
    if (!documentationLink) {
      return;
    }

    sendUserActionTrackingEvent(trackingEvents.INSIGHTS_INFO_OPEN_DOCS_CLICKED);
    openURLInDefaultBrowser(documentationLink);
    onClose();
  };

  const handleCloseClick = () => {
    sendUserActionTrackingEvent(trackingEvents.INSIGHTS_INFO_OPEN_DOCS_CLICKED);
    onClose();
  };

  return (
    <Tooltip
      isOpen={isOpen}
      onDismiss={onClose}
      isDisabled={!Description}
      placement={"top"}
      title={
        <s.Container>
          <s.Header>
            <s.CloseButton onClick={handleCloseClick}>
              <s.CloseButtonIconContainer>
                <CrossIcon color={"currentColor"} size={12} />
              </s.CloseButtonIconContainer>
            </s.CloseButton>
          </s.Header>
          <s.Content>
            <s.Description>{Description && <Description />}</s.Description>
            {documentationLink && (
              <s.StyledLink onClick={handleOpenDocsClick}>
                Open Docs
              </s.StyledLink>
            )}
          </s.Content>
        </s.Container>
      }
      hideArrow={true}
    >
      {children}
    </Tooltip>
  );
};
