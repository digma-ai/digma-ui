import { memo } from "react";
import * as s from "./styles";
import { BadgeProps } from "./types";

const BadgeComponent = ({ customStyles }: BadgeProps) => (
  <s.Outline $customStyles={customStyles?.outline}>
    <s.Badge $customStyles={customStyles?.main} />
  </s.Outline>
);

export const Badge = memo(BadgeComponent);
