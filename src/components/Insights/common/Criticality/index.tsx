import { getCriticalityLabel } from "../../../../utils/getCriticalityLabel";
import { ScoreIndicator } from "../../../common/ScoreIndicator";
import { Tooltip } from "../../../common/Tooltip";
import { Description } from "../../styles";
import * as s from "./styles";

export const Criticality = (props: { value: number }) => (
  <s.Container>
    <Description>Criticality</Description>
    <Tooltip title={props.value}>
      <s.CriticalityValue>
        {props.value > 0 && <ScoreIndicator score={props.value} />}
        {getCriticalityLabel(props.value)}
      </s.CriticalityValue>
    </Tooltip>
  </s.Container>
);
