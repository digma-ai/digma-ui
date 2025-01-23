import type { ReactNode } from "react";
import { DELIMITER } from "../../../constants";
import { trimEndpointScheme } from "../../../utils/trimEndpointScheme";
import { Select } from "../../Insights/InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/common/InsightCard/Select";
import type { CustomContentProps } from "../../Insights/InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/common/InsightCard/Select/types";
import { EndpointOption } from "./EndpointOption";
import * as s from "./styles";
import type { AffectedEndpointsSelectorProps, Option } from "./types";

export const getEndpointKey = (option: Option): string =>
  [option.serviceName, option.spanCodeObjectId].join(DELIMITER);

const renderOptions = <T,>(
  endpoints: Option<T>[],
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
        <EndpointOption<T>
          serviceName={x.serviceName}
          route={route}
          selected={isSelected}
          spanCodeObjectId={spanCodeObjectId}
          onSpanLinkClick={handleLinkClick}
          hideCopyIcon={!isSelected}
          onClick={onClick}
          metric={"metric" in x ? x.metric : undefined}
        />
      ),
      value: getEndpointKey(x)
    };
  });

export const AffectedEndpointsSelector = <T = undefined,>({
  onAssetLinkClick,
  value,
  options,
  onChange,
  isDisabled
}: AffectedEndpointsSelectorProps<T>) => {
  const handleSpanLinkClick = (spanCodeObjectId?: string) => {
    if (spanCodeObjectId) {
      onAssetLinkClick(spanCodeObjectId);
    }
  };

  const handleSelectChange = (value: string) => {
    onChange(value);
  };

  const metric =
    options.length > 0 && "metric" in options[0]
      ? options[0].metric
      : undefined;

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
            metric={metric}
            isHeader={true}
          />
        </s.ListHeader>
      }
    />
  );
};
