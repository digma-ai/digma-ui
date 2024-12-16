import * as s from "./styles";
import type { CodeLocationsProps } from "./types";

export const CodeLocations = ({ codeLocations }: CodeLocationsProps) => {
  if (!codeLocations || codeLocations.length === 0) {
    return null;
  }

  return (
    <div>
      <div>Related code locations:</div>
      <s.List>
        {codeLocations.map((x) => (
          <div key={x}>{x}</div>
        ))}
      </s.List>
    </div>
  );
};
