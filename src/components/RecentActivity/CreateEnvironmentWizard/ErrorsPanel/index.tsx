import { ErrorCard } from "../ErrorCard";
import * as s from "./styles";
import { ErrorsPanelProps } from "./types";

export const ErrorsPanel = ({ errors }: ErrorsPanelProps) => {
  return (
    <s.Container>
      {errors.map((x) => (
        <ErrorCard key={x.id} title={x.title} description={x.description} />
      ))}
    </s.Container>
  );
};
