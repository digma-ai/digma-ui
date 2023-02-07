import React from "react";
import * as s from "./styles";

const BadgeComponent = () => (
  <s.Outline>
    <s.Badge />
  </s.Outline>
);

export const Badge = React.memo(BadgeComponent);
