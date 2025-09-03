import styled from "styled-components";
import { Accordion } from "../Accordion";
import { Content, Summary } from "../Accordion/styles";
import { PulsatingDot } from "../PulsatingDot";
import type { SectionAccordionProps } from "./types";

export const Container = styled.div`
  position: relative;
`;

export const StickySentinel = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 1px;
`;

export const SectionAccordion = styled(Accordion)<SectionAccordionProps>`
  border: 1px solid hsl(${({ $hue }) => $hue} 50% 30%);
  overflow: visible;

  & > ${Summary} {
    background: ${({ theme }) => theme.colors.v3.surface.secondary};
    background-image: linear-gradient(
      hsl(${({ $hue }) => $hue} 50% 30% / 15%),
      hsl(${({ $hue }) => $hue} 50% 30% / 15%)
    );
    position: sticky;
    top: 0;
    z-index: 1;
    border-radius: ${({ $isSticky }) => ($isSticky ? "0" : "8px")};
  }

  & > ${Content} {
    background: hsl(${({ $hue }) => $hue} 50% 30% / 15%);
  }
`;

export const SectionAccordionSummaryContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SummarySubtitle = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const SectionAccordionContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StyledPulsatingDot = styled(PulsatingDot)`
  width: 14px;
  height: 14px;
  background: ${({ theme }) => theme.colors.v3.surface.brandPrimary};
`;

export const Description = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.v3.text.tertiary};
  border-radius: 8px;
  padding: 8px;
`;
