import { css } from "styled-components";
import { Typographies } from "../../../styled";

export const typographies: Typographies = {
  body: {
    fontSize: 14,
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeight: 18
  },
  subscript: {
    fontSize: 13,
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeight: 16
  },
  footNote: {
    fontSize: 12,
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 600
    },
    lineHeight: 16
  },
  captionOne: {
    fontSize: 11,
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 600
    },
    lineHeight: 14
  },
  captionTwo: {
    fontSize: 10,
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 600
    },
    lineHeight: 14
  }
};

export const caption1RegularTypography = css`
  font-size: ${typographies.captionOne.fontSize}px;
  font-weight: ${typographies.captionOne.fontWeight.regular};
  line-height: ${typographies.captionOne.lineHeight}px;
`;

export const caption2RegularTypography = css`
  font-size: ${typographies.captionTwo.fontSize}px;
  font-weight: ${typographies.captionTwo.fontWeight.regular};
  line-height: ${typographies.captionTwo.lineHeight}px;
`;

export const footnoteRegularTypography = css`
  font-size: ${typographies.footNote.fontSize}px;
  font-weight: ${typographies.footNote.fontWeight.regular};
  line-height: ${typographies.footNote.lineHeight}px;
`;

export const subscriptRegularTypography = css`
  font-size: ${typographies.subscript.fontSize}px;
  font-weight: ${typographies.subscript.fontWeight.regular};
  line-height: ${typographies.subscript.lineHeight}px;
`;

export const bodyRegularTypography = css`
  font-size: ${typographies.body.fontSize}px;
  font-weight: ${typographies.body.fontWeight.regular};
  line-height: ${typographies.body.lineHeight}px;
`;
