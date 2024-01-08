import * as s from "./styles";
import { CodeLocationsProps } from "./types";

export const CodeLocations = (props: CodeLocationsProps) => {
  if (!props.codeLocations || props.codeLocations.length === 0) {
    return null;
  }

  return (
    <div>
      <div>Related code locations:</div>
      <s.List>
        {props.codeLocations.map((x) => (
          <div key={x}>{x}</div>
        ))}
      </s.List>
    </div>
  );
};
