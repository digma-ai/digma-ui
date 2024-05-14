import { RefObject, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { getAssetTypeInfo } from "../../Assets/utils";
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

const EXPAND_BTN_TRANSITION_CLASS_NAME = "expand-btn-animations";
const STATS_TRANSITION_CLASS_NAME = "stats-animation";
const DEFAULT_TRANSITION_DURATION = 500; // in milliseconds

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
  const expandedBtnRef = useRef<HTMLButtonElement>(null);
  const collapseBtnRef = useRef<HTMLButtonElement>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);

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

  const ExpandButtonIcon = isExpanded ? ArrowsInsideIcon : ArrowsOutsideIcon;

  const servicesTooltipTitle = data.services.join(", ");
  const environmentsTooltipTitle = data.environments
    .map((x) => x.name)
    .join(", ");

  const renderAnimatedButton = (
    isVisible: boolean,
    name: string,
    ref: RefObject<HTMLButtonElement>
  ) => {
    return (
      <CSSTransition
        in={isVisible}
        classNames={EXPAND_BTN_TRANSITION_CLASS_NAME}
        timeout={DEFAULT_TRANSITION_DURATION}
        mountOnEnter={true}
        unmountOnExit={true}
        nodeRef={ref}
      >
        <s.ExpandButton
          ref={ref}
          $transitionClassName={EXPAND_BTN_TRANSITION_CLASS_NAME}
          $transitionDuration={DEFAULT_TRANSITION_DURATION}
          onClick={handleExpandButtonClick}
        >
          <s.ExpandButtonIconButtonContainer>
            <ExpandButtonIcon color={"currentColor"} size={12} />
          </s.ExpandButtonIconButtonContainer>
          {name}
        </s.ExpandButton>
      </CSSTransition>
    );
  };

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
        <s.AnimatedButtonContainer $isExpanded={isExpanded}>
          {renderAnimatedButton(!isExpanded, "Expand", expandedBtnRef)}
          {renderAnimatedButton(isExpanded, "Collapse", collapseBtnRef)}
        </s.AnimatedButtonContainer>
      </s.Header>
      <s.ContentContainer>
        <s.StyledCodeSnippet
          language={getLanguage(data.assetTypeId)}
          text={data.displayName}
          $isExpanded={isExpanded}
        />
        <CSSTransition
          in={isExpanded}
          classNames={STATS_TRANSITION_CLASS_NAME}
          timeout={DEFAULT_TRANSITION_DURATION}
          nodeRef={statsRef}
          mountOnEnter={true}
          unmountOnExit={true}
        >
          <s.StatsContainer
            $transitionClassName={STATS_TRANSITION_CLASS_NAME}
            $transitionDuration={DEFAULT_TRANSITION_DURATION}
            ref={statsRef}
          >
            <s.Stat>
              <s.StatLabel>Services</s.StatLabel>
              <s.StatValue>
                <Tooltip title={servicesTooltipTitle}>
                  <s.StatValueContainer>
                    <s.StatIconContainer>
                      <WrenchIcon color={"currentColor"} size={16} />
                    </s.StatIconContainer>

                    <s.StatValueText>{data.services[0]}</s.StatValueText>
                    {data.services.length > 1 && (
                      <span>+{data.services.length - 1}</span>
                    )}
                  </s.StatValueContainer>
                </Tooltip>
              </s.StatValue>
            </s.Stat>
            <s.Stat>
              <s.StatLabel>Environments</s.StatLabel>

              <s.StatValue>
                <Tooltip title={environmentsTooltipTitle}>
                  <s.StatValueContainer>
                    <s.StatIconContainer>
                      <GlobeIcon color={"currentColor"} size={16} />
                    </s.StatIconContainer>

                    <s.StatValueText>
                      {data.environments[0].name}
                    </s.StatValueText>
                    {data.environments.length > 1 && (
                      <span>
                        <span>+{data.environments.length - 1}</span>
                      </span>
                    )}
                  </s.StatValueContainer>
                </Tooltip>
              </s.StatValue>
            </s.Stat>
          </s.StatsContainer>
        </CSSTransition>
      </s.ContentContainer>
    </s.Container>
  );
};
