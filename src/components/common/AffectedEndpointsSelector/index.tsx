import type { ReactNode } from "react";
import { DELIMITER } from "../../../constants";
import { trimEndpointScheme } from "../../../utils/trimEndpointScheme";
import { Select } from "../../Insights/InsightsCatalog/InsightsPage/insightCards/common/InsightCard/Select";
import type { CustomContentProps } from "../../Insights/InsightsCatalog/InsightsPage/insightCards/common/InsightCard/Select/types";
import { EndpointOption } from "./EndpointOption";
import * as s from "./styles";
import type { AffectedEndpointsSelectorProps, Option } from "./types";

export const getEndpointKey = (option: Option): string => {
  return [option.serviceName, option.spanCodeObjectId].join(DELIMITER);
};

const renderOptions = (
  endpoints: Option[],
  handleLinkClick: (spanCodeObjectId?: string) => void
): {
  label: string;
  customContent: (props: CustomContentProps) => ReactNode;
  value: string;
}[] =>
  endpoints.map((x) => {
    const spanCodeObjectId = x.spanCodeObjectId;
    const route = trimEndpointScheme(x.route);
    return {
      label: route,
      customContent: ({ isSelected, onClick }) => (
        <EndpointOption
          serviceName={x.serviceName}
          route={route}
          selected={isSelected}
          spanCodeObjectId={spanCodeObjectId}
          onSpanLinkClick={handleLinkClick}
          hideCopyIcon={!isSelected}
          onClick={onClick}
        />
      ),
      value: getEndpointKey(x)
    };
  });

export const AffectedEndpointsSelector = ({
  onAssetLinkClick,
  value,
  options,
  onChange,
  isDisabled
}: AffectedEndpointsSelectorProps) => {
  const handleSpanLinkClick = (spanCodeObjectId?: string) => {
    if (spanCodeObjectId) {
      onAssetLinkClick(spanCodeObjectId);
    }
  };

  const handleSelectChange = (value: string) => {
    onChange(value);
  };

  return (
    <Select
      value={value}
      onChange={handleSelectChange}
      options={renderOptions(options, handleSpanLinkClick)}
      isDisabled={isDisabled}
      listHeader={
        <s.ListHeader>
          <EndpointOption
            route={"Endpoint"}
            serviceName={"Service"}
            hideCopyIcon={true}
          />
        </s.ListHeader>
      }
    />
  );
};
