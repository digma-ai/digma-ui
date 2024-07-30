import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ReportCard } from "../../ReportCard";
import { CardOption } from "../CardOption";
import * as s from "./styles";
import { DiscoveredCardProps } from "./types";

export const DiscoveredCard = ({ options, title }: DiscoveredCardProps) => {
  const [selected] = useState<string>();
  return (
    <ReportCard
      header={<s.Header>{title}</s.Header>}
      content={
        <s.Container>
          {options.map((row) => (
            <s.Row key={uuidv4()}>
              {row.map((option) => (
                <CardOption
                  key={uuidv4()}
                  {...option}
                  isActive={selected == option.title}
                />
              ))}
            </s.Row>
          ))}
        </s.Container>
      }
    />
  );
};
