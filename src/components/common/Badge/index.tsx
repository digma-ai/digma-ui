import React from "react";
import * as s from "./styles";

const BadgeComponent = () => (
  <s.Container>
    <s.Badge />
  </s.Container>
);

export const Badge = React.memo(BadgeComponent);
