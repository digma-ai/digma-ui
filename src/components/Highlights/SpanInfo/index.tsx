import { useEffect, useState } from "react";
import { getAssetTypeInfo } from "../../Assets/utils";
import { CodeSnippet } from "../../common/CodeSnippet";
import { ArrowsInsideIcon } from "../../common/icons/12px/ArrowsInsideIcon";
import { ArrowsOutsideIcon } from "../../common/icons/12px/ArrowsOutsideIcon";
import { GlobeIcon } from "../../common/icons/16px/GlobeIcon";
import { RefreshIcon } from "../../common/icons/16px/RefreshIcon";
import { WrenchIcon } from "../../common/icons/16px/WrenchIcon";
import { Tag } from "../../common/v3/Tag";
import { Tooltip } from "../../common/v3/Tooltip";
import { EmptyStateCard } from "../EmptyStateCard";
import * as s from "./styles";
import { useSpanInfoData } from "./useSpanInfoData";

const SPAN_NAME_MAX_LENGTH = 75;

const getLanguage = (assetTypeId: string) => {
  if (assetTypeId === "DatabaseQueries") {
    return "sql";
  }

  if (assetTypeId === "Endpoint" || assetTypeId === "EndpointClient") {
    return "http";
  }

  return undefined;
};

export const SpanInfo = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { data, getData } = useSpanInfoData();

  const handleExpandButtonClick = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    getData();
  }, []);

  if (!data) {
    return <EmptyStateCard icon={RefreshIcon} title={"Waiting for data"} />;
  }

  const assetTypeInfo = getAssetTypeInfo(data.assetTypeId);

  const isNameTooLong = data.displayName.length > SPAN_NAME_MAX_LENGTH;
  const truncatedName = isNameTooLong
    ? `${data.displayName.slice(0, SPAN_NAME_MAX_LENGTH)}...`
    : data.displayName;
  const codeSnippetText = isExpanded ? data.displayName : truncatedName;

  const ExpandButtonIcon = isExpanded ? ArrowsInsideIcon : ArrowsOutsideIcon;

  const servicesTooltipTitle = data.services.slice(1).join(", ");
  const environmentsTooltipTitle = data.environments
    .slice(1)
    .map((x) => x.name)
    .join(", ");

  return (
    <s.Container>
      <s.Header>
        <s.TitleContainer>
          {assetTypeInfo?.icon && (
            <Tag
              content={
                <s.IconContainer>
                  <assetTypeInfo.icon color={"currentColor"} size={16} />
                </s.IconContainer>
              }
            />
          )}
          Span Info
        </s.TitleContainer>
        {isNameTooLong && (
          <s.ExpandButton onClick={handleExpandButtonClick}>
            <s.ExpandButtonIconButtonContainer>
              <ExpandButtonIcon color={"currentColor"} size={12} />
            </s.ExpandButtonIconButtonContainer>
            {isExpanded ? "Collapse" : "Expand"}
          </s.ExpandButton>
        )}
      </s.Header>
      <s.ContentContainer>
        <CodeSnippet
          language={getLanguage(data.assetTypeId)}
          text={codeSnippetText}
        />
        <s.StatsContainer>
          <s.Stat>
            <s.StatLabel>Services</s.StatLabel>

            <s.StatValue>
              <s.StatIconContainer>
                <WrenchIcon color={"currentColor"} size={16} />
              </s.StatIconContainer>
              <s.StatValueText>{data.services[0]}</s.StatValueText>
              {data.services.length > 1 && (
                <Tooltip title={servicesTooltipTitle}>
                  <span>+{data.services.length - 1}</span>
                </Tooltip>
              )}
            </s.StatValue>
          </s.Stat>
          <s.Stat>
            <s.StatLabel>Environments</s.StatLabel>

            <s.StatValue>
              <s.StatIconContainer>
                <GlobeIcon color={"currentColor"} size={16} />
              </s.StatIconContainer>
              <s.StatValueText>{data.environments[0].name}</s.StatValueText>
              {data.environments.length > 1 && (
                <Tooltip title={environmentsTooltipTitle}>
                  <span>
                    <span>+{data.environments.length - 1}</span>
                  </span>
                </Tooltip>
              )}
            </s.StatValue>
          </s.Stat>
        </s.StatsContainer>
      </s.ContentContainer>
    </s.Container>
  );
};
