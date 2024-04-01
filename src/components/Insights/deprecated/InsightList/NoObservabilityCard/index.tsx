import { DefaultTheme, useTheme } from "styled-components";
import { Button } from "../../../../common/Button";
import { Card } from "../../../../common/Card";
import { OpenTelemetryLogoCrossedSmallIcon } from "../../../../common/icons/OpenTelemetryLogoCrossedSmallIcon";
import { Description, Link } from "../../../styles";
import * as s from "./styles";
import { NoObservabilityCardProps } from "./types";

const getIconColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#4d668a";
    case "dark":
    case "dark-jetbrains":
      return "#dadada";
  }
};

export const NoObservabilityCard = (props: NoObservabilityCardProps) => {
  const theme = useTheme();
  const iconColor = getIconColor(theme);

  const handleAutofixLinkClick = () => {
    props.onAutofix();
  };

  const handleAddAnnotationButtonClick = () => {
    props.onAddAnnotation();
  };

  return (
    <Card
      header={
        <s.Title>
          <s.InsightIconContainer>
            <OpenTelemetryLogoCrossedSmallIcon color={iconColor} size={16} />
          </s.InsightIconContainer>
          No observability
        </s.Title>
      }
      content={
        <>
          <Description>
            Add an annotation to observe this method and collect data about its
            runtime behavior
          </Description>
          {props.hasMissingDependency && (
            <s.MissingDependencyContainer>
              <s.MissingDependencyText>
                missing dependency: opentelemetry.annotation
              </s.MissingDependencyText>
              <Link onClick={handleAutofixLinkClick}>Autofix</Link>
            </s.MissingDependencyContainer>
          )}
        </>
      }
      buttons={[
        ...(props.canInstrumentMethod
          ? [
              <Button
                key={"addAnnotation"}
                onClick={handleAddAnnotationButtonClick}
                disabled={props.hasMissingDependency}
              >
                Add annotation
              </Button>
            ]
          : [])
      ]}
    />
  );
};
