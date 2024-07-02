import * as s from "./styles";
import { PageProps } from "./types";

export const Page = ({ title, description, sections }: PageProps) => (
  <s.Container>
    <s.Header>
      <s.Title>{title}</s.Title>
      {description}
    </s.Header>
    {sections?.map((section, i) => (
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
  </s.Container>
);
