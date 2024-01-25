import { getCriticalityLabel } from "../../../../utils/getCriticalityLabel";
import { ScoreIndicator } from "../../../common/ScoreIndicator";
import { Tooltip } from "../../../common/Tooltip";
import { Description } from "../../styles";
import * as s from "./styles";

export const Criticality = (criticality: number) => (
  <>
    <Description>Criticality</Description>
    <Tooltip title={criticality}>
      <s.CriticalityValue>
        {criticality > 0 && <ScoreIndicator score={criticality} />}
        {getCriticalityLabel(criticality)}
      </s.CriticalityValue>
    </Tooltip>
  </>
);
