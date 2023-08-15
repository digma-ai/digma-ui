import * as s from "./styles";
import { PageProps } from "./types";

export const Page = (props: PageProps) => (
  <>
    <s.Header>
      <s.Title>{props.title}</s.Title>
      {props.description}
    </s.Header>
    {props.sections &&
      props.sections.map((section, i) => (
        <s.Section key={i}>
          <s.SectionHeader>
            {Number.isInteger(section.number) && (
              <s.SectionNumber>{section.number}</s.SectionNumber>
            )}
            <s.SectionTitleContainer>
              <s.SectionTitle>{section.title}</s.SectionTitle>
              {section.description}
            </s.SectionTitleContainer>
          </s.SectionHeader>
          {section.content}
        </s.Section>
      ))}
  </>
);
