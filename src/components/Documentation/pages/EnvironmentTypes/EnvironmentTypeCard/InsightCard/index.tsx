import { isNumber } from "../../../../../../typeGuards/isNumber";
import { getInsightTypeInfo } from "../../../../../../utils/getInsightTypeInfo";
import { InfoCircleIcon } from "../../../../../common/icons/InfoCircleIcon";
import * as s from "./styles";
import { InsightCardProps } from "./types";

export const InsightCard = (props: InsightCardProps) => {
  const insightTypeInfo = getInsightTypeInfo(props.type);

  if (!insightTypeInfo) {
    return <></>;
  }

  return (
    <s.Container $isDisabled={props.isDisabled}>
      <s.Header>
        <insightTypeInfo.icon size={22} color={"currentcolor"} />
        <span>{insightTypeInfo.label}</span>
      </s.Header>
      <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
        ducimus architecto natus omnis aut, illum totam non maiores fuga,
        accusantium vero dolorum.
      </span>
      <s.StatusContainer>
        {!props.isDisabled && (
          <>
            {isNumber(props.count) ? (
              <s.CountChip $count={props.count}>{`${props.count} issue${
                props.count === 1 ? "" : "s"
              } found`}</s.CountChip>
            ) : (
              <s.NoDataContainer>
                <s.NoDataChip>No Data</s.NoDataChip>
                <InfoCircleIcon size={14} color={"currentColor"} />
                <s.Link>What is this?</s.Link>
              </s.NoDataContainer>
            )}
          </>
        )}
      </s.StatusContainer>
    </s.Container>
  );
};
