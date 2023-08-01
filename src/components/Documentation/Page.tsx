import { CodeSnippet } from "../InstallationWizard/CodeSnippet";
import * as s from "./styles";
import { PageProps } from "./types";

export const Page = (props: PageProps) => (
  <>
    <s.Header>
      <s.Title>{props.title}</s.Title>
      {props.description && <span>{props.description}</span>}
    </s.Header>
    {props.sections.map((section, i) => (
      <s.Section key={section.title}>
        <s.SectionHeader>
          <s.SectionNumber>{i + 1}</s.SectionNumber>
          <s.SectionTitleContainer>
            <s.SectionTitle>{section.title}</s.SectionTitle>
            {props.description &&
              props.description.map((text) => <span key={text}>{text}</span>)}
          </s.SectionTitleContainer>
        </s.SectionHeader>
        {section.code && <CodeSnippet text={section.code} />}
      </s.Section>
    ))}
  </>
);
