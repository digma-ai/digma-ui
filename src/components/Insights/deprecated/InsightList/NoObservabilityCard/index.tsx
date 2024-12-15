import { Button } from "../../../../common/Button";
import { Card } from "../../../../common/Card";
import { OpenTelemetryLogoCrossedSmallIcon } from "../../../../common/icons/OpenTelemetryLogoCrossedSmallIcon";
import { Description, Link } from "../../../styles";
import * as s from "./styles";
import type { NoObservabilityCardProps } from "./types";

/**
 * @deprecated
 * safe to delete after the implementation of the version with new UI
 */
export const NoObservabilityCard = ({
  onAutofix,
  onAddAnnotation,
  hasMissingDependency,
  canInstrumentMethod
}: NoObservabilityCardProps) => {
  const handleAutofixLinkClick = () => {
    onAutofix();
  };

  const handleAddAnnotationButtonClick = () => {
    onAddAnnotation();
  };

  return (
    <Card
      header={
        <s.Title>
          <s.InsightIconContainer>
            <OpenTelemetryLogoCrossedSmallIcon
              color={"currentColor"}
              size={16}
            />
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
          {hasMissingDependency && (
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
        ...(canInstrumentMethod
          ? [
              <Button
                key={"addAnnotation"}
                onClick={handleAddAnnotationButtonClick}
                disabled={hasMissingDependency}
              >
                Add annotation
              </Button>
            ]
          : [])
      ]}
    />
  );
};
