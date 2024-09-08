import { ReactNode } from "react";
import { trimEndpointScheme } from "../../../../../utils/trimEndpointScheme";
import { Select } from "../insightCards/common/InsightCard/Select";
import { CustomContentProps } from "../insightCards/common/InsightCard/Select/types";
import { EndpointOption } from "./EndpointOption";
import * as s from "./styles";
import { AffectedEndpointsSelectorProps, Option } from "./types";

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
      value: spanCodeObjectId
    };
  });

export const AffectedEndpointsSelector = ({
  onAssetLinkClick,
  insightType,
  value,
  options,
  onChange
}: AffectedEndpointsSelectorProps) => {
  const handleSpanLinkClick = (spanCodeObjectId?: string) => {
    if (spanCodeObjectId) {
      onAssetLinkClick(spanCodeObjectId, insightType);
    }
  };

  return (
    <Select
      value={value}
      onChange={(selectedOption) => {
        const selected =
          options.find((x) => x.spanCodeObjectId === selectedOption) ?? null;

        onChange(selected);
      }}
      options={renderOptions(options, handleSpanLinkClick)}
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
