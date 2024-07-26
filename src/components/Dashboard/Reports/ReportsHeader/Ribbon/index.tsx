import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import { DownloadIcon } from "../../../../common/icons/12px/DownloadIcon";
import { RecalculateIcon } from "../../../../common/icons/16px/RecalculateIcon";
import { NewButton } from "../../../../common/v3/NewButton";
import { trackingEvents } from "../../tracking";
import * as s from "./styles";
import { RibbonProps } from "./types";

export const Ribbon = ({ onDownload, onRefresh }: RibbonProps) => {
  const handleDownloadClick = () => {
    sendUserActionTrackingEvent(trackingEvents.DOWNLOAD_REPORT_CLICKED);
    onDownload();
  };

  const handleRefreshClick = () => {
    sendUserActionTrackingEvent(trackingEvents.REFRESH_DATA_CLICKED);
    onRefresh();
  };

  return (
    <s.Container>
      <img src={"images/reports-ribbon-logo-dark.svg"} />
      <s.ButtonContainer>
        <NewButton
          buttonType="primary"
          icon={RecalculateIcon}
          label="Refresh data"
          onClick={handleRefreshClick}
        />
        <s.DownloadButton
          buttonType="tertiary"
          icon={DownloadIcon}
          label="Download PDF"
          iconPosition="right"
          onClick={handleDownloadClick}
        />
      </s.ButtonContainer>
    </s.Container>
  );
};
