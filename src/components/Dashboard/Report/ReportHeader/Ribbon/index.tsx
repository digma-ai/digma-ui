import { useTheme } from "styled-components";
import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import { getThemeKind } from "../../../../common/App/styles";
import { RecheckIcon } from "../../../../common/icons/16px/RecheckIcon";
import { NewButton } from "../../../../common/v3/NewButton";
import { trackingEvents } from "../../tracking";
import * as s from "./styles";
import { RibbonProps } from "./types";

export const Ribbon = ({ onRefresh }: RibbonProps) => {
  const theme = useTheme();
  const themeKind = getThemeKind(theme);

  // const handleDownloadClick = () => {
  //   sendUserActionTrackingEvent(trackingEvents.DOWNLOAD_REPORT_CLICKED);
  //   onDownload();
  // };

  const handleRefreshClick = () => {
    sendUserActionTrackingEvent(trackingEvents.REFRESH_DATA_CLICKED);
    onRefresh();
  };

  return (
    <s.Container>
      <img src={`/assets/images/digmaLogo_${themeKind}.svg`} />
      <s.ButtonContainer>
        <NewButton
          buttonType={"primary"}
          icon={RecheckIcon}
          label={"Refresh data"}
          onClick={handleRefreshClick}
        />
        {/* <s.DownloadButton
          buttonType={"tertiary"}
          icon={DownloadIcon}
          label={"Download PDF"}
          iconPosition={"right"}
          onClick={handleDownloadClick}
        /> */}
      </s.ButtonContainer>
    </s.Container>
  );
};
