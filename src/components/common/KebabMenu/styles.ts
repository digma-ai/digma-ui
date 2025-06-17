import styled from "styled-components";
import { Popup as CommonPopup } from "../../Navigation/common/Popup";
import { ContentContainer } from "../../Navigation/common/Popup/styles";

export const Popup = styled(CommonPopup)`
  & > ${ContentContainer} {
    padding: 3px 8px;
  }
`;
