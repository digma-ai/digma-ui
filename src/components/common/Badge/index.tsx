import React from "react";
import * as s from "./styles";
import { BadgeProps } from "./types";

const BadgeComponent = (props: BadgeProps) => (
  <s.Outline $customStyles={props.customStyles?.outline}>
    <s.Badge $customStyles={props.customStyles?.main} />
  </s.Outline>
);

export const Badge = React.memo(BadgeComponent);
