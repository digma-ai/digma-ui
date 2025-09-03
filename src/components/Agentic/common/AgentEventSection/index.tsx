import { useEffect, useRef, useState } from "react";
import { AgentEventList } from "../AgentEventList";
import * as s from "./styles";
import type { AgentEventSectionProps, AgentEventSectionType } from "./types";

const getHue = (index: number, sectionType?: AgentEventSectionType) => {
  if (sectionType === "intro") {
    return 30;
  }

  if (sectionType === "summary") {
    return 330;
  }

  const hueValues = [90, 150, 210, 270];
  return hueValues[index % hueValues.length];
};

export const AgentEventSection = ({
  data,
  type,
  typeInitialEvents,
  index
}: AgentEventSectionProps) => {
  const [isSticky, setIsSticky] = useState(false);
  const stickyRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(entry.intersectionRatio < 1);
      },
      {
        threshold: [1]
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <s.Container>
      <s.StickySentinel ref={sentinelRef} />
      <s.SectionAccordion
        ref={stickyRef}
        $isSticky={isSticky}
        $hue={getHue(index, type)}
        summary={
          <s.SectionAccordionSummaryContainer>
            <span>{data.section?.name}</span>
            {data.section?.status === "active" && <s.StyledPulsatingDot />}
            <s.SummarySubtitle>{data.section?.summary}</s.SummarySubtitle>
          </s.SectionAccordionSummaryContainer>
        }
        content={
          <s.SectionAccordionContentContainer>
            <s.Description>{data.section?.description}</s.Description>
            {data.events && (
              <AgentEventList
                events={data.events}
                typeInitialEvents={typeInitialEvents}
              />
            )}
          </s.SectionAccordionContentContainer>
        }
      />
    </s.Container>
  );
};
