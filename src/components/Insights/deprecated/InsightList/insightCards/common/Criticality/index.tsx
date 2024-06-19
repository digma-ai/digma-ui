import { getCriticalityLabel } from "../../../../../../../utils/getCriticalityLabel";
import { ScoreIndicator } from "../../../../../../common/ScoreIndicator";
import { Tooltip } from "../../../../../../common/Tooltip";
import { Description } from "../../../../../styles";
import * as s from "./styles";
import { CriticalityProps } from "./types";

/**
 * @deprecated
 * safe to delete after 2024-06-05
 */
export const Criticality = ({ value }: CriticalityProps) => (
  <s.Container>
    <Description>Criticality</Description>
    <Tooltip title={value}>
      <s.CriticalityValue>
        {value > 0 && <ScoreIndicator score={value} />}
        {getCriticalityLabel(value)}
      </s.CriticalityValue>
    </Tooltip>
  </s.Container>
);
