import { DefaultTheme, useTheme } from "styled-components";
import { CrossCircleIcon } from "../../../common/icons/20px/CrossCircleIcon";
import { PetalsIcon } from "../../../common/icons/32px/PetalsIcon";
import { CardsColoredIcon } from "../../../common/icons/CardsColoredIcon";
import { NewButton } from "../../../common/v3/NewButton";
import * as s from "./styles";
import { EmptyStateContent, EmptyStateProps, EmptyStateType } from "./types";

const getContent = (type: EmptyStateType, theme: DefaultTheme) => {
  const handleRefreshButtonClick = () => {
    window.location.reload();
  };

  const content: Record<EmptyStateType, EmptyStateContent> = {
    noData: {
      title: "No available data",
      message:
        "Make sure you have at least one active environment to fetch data from",
      icon: <CrossCircleIcon color={theme.colors.v3.surface.gray} size={32} />,
      customContent: (
        <NewButton
          buttonType={"secondary"}
          label={"Refresh"}
          onClick={handleRefreshButtonClick}
        />
      )
    },
    noServices: {
      title: "No Results",
      message: "No services recorded for this environment",
      icon: <CardsColoredIcon size={40} />
    },
    noEndpoints: {
      title: "No Results",
      message: "No entry points recorded for this environment",
      icon: <CardsColoredIcon size={40} />
    },
    loading: {
      title: "Fetching results",
      message: "Updating the results list may take a few moments",
      icon: <PetalsIcon color={theme.colors.v3.surface.gray} size={32} />
    }
  };

  return content[type];
};

export const EmptyState = ({ type }: EmptyStateProps) => {
  const theme = useTheme();
  const content = getContent(type, theme);

  return content ? (
    <s.Container>
      <s.ContentContainer>
        <s.IconContainer>{content.icon}</s.IconContainer>
        <s.TextContainer>
          <s.Title>{content.title}</s.Title>
          <span>{content.message}</span>
        </s.TextContainer>
        {content.customContent}
      </s.ContentContainer>
    </s.Container>
  ) : null;
};
