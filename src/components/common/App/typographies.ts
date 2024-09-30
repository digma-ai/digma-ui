import { css } from "styled-components";
import { Typographies } from "../../../styled";

export const typographies: Typographies = {
  code: {
    fontSize: 14,
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  subheading1: {
    fontSize: 16,
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  subheading2: {
    fontSize: 20,
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
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
  },
  display: {
    fontSize: 48,
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 600
    }
  },
  heading1: {
    fontSize: 24,
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 600
    }
  },
  heading2: {
    fontSize: 36,
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  }
};

export const caption1RegularTypography = css`
  font-size: ${typographies.captionOne.fontSize}px;
  font-weight: ${typographies.captionOne.fontWeight.regular};
  line-height: ${typographies.captionOne.lineHeight}px;
`;

export const caption1MediumTypography = css`
  font-size: ${typographies.captionOne.fontSize}px;
  font-weight: ${typographies.captionOne.fontWeight.medium};
  line-height: ${typographies.captionOne.lineHeight}px;
`;

export const caption1BoldTypography = css`
  font-size: ${typographies.captionOne.fontSize}px;
  font-weight: ${typographies.captionOne.fontWeight.bold};
  line-height: ${typographies.captionOne.lineHeight}px;
`;

export const caption2RegularTypography = css`
  font-size: ${typographies.captionTwo.fontSize}px;
  font-weight: ${typographies.captionTwo.fontWeight.regular};
  line-height: ${typographies.captionTwo.lineHeight}px;
`;

export const caption2BoldTypography = css`
  font-size: ${typographies.captionTwo.fontSize}px;
  font-weight: ${typographies.captionTwo.fontWeight.bold};
  line-height: ${typographies.captionTwo.lineHeight}px;
`;

export const footnoteRegularTypography = css`
  font-size: ${typographies.footNote.fontSize}px;
  font-weight: ${typographies.footNote.fontWeight.regular};
  line-height: ${typographies.footNote.lineHeight}px;
`;

export const footnoteMediumTypography = css`
  font-size: ${typographies.footNote.fontSize}px;
  font-weight: ${typographies.footNote.fontWeight.medium};
  line-height: ${typographies.footNote.lineHeight}px;
`;

export const footnoteSemiboldTypography = css`
  font-size: ${typographies.footNote.fontSize}px;
  font-weight: ${typographies.footNote.fontWeight.semibold};
  line-height: ${typographies.footNote.lineHeight}px;
`;

export const footnoteBoldTypography = css`
  font-size: ${typographies.footNote.fontSize}px;
  font-weight: ${typographies.footNote.fontWeight.bold};
  line-height: ${typographies.footNote.lineHeight}px;
`;

export const subscriptRegularTypography = css`
  font-size: ${typographies.subscript.fontSize}px;
  font-weight: ${typographies.subscript.fontWeight.regular};
  line-height: ${typographies.subscript.lineHeight}px;
`;

export const subscriptMediumTypography = css`
  font-size: ${typographies.subscript.fontSize}px;
  font-weight: ${typographies.subscript.fontWeight.medium};
  line-height: ${typographies.subscript.lineHeight}px;
`;

export const subscriptSemiboldTypography = css`
  font-size: ${typographies.subscript.fontSize}px;
  font-weight: ${typographies.subscript.fontWeight.semibold};
  line-height: ${typographies.subscript.lineHeight}px;
`;

export const bodyRegularTypography = css`
  font-size: ${typographies.body.fontSize}px;
  font-weight: ${typographies.body.fontWeight.regular};
  line-height: ${typographies.body.lineHeight}px;
`;

export const bodyMediumTypography = css`
  font-size: ${typographies.body.fontSize}px;
  font-weight: ${typographies.body.fontWeight.medium};
  line-height: ${typographies.body.lineHeight}px;
`;

export const bodySemiboldTypography = css`
  font-size: ${typographies.body.fontSize}px;
  font-weight: ${typographies.body.fontWeight.semibold};
  line-height: ${typographies.body.lineHeight}px;
`;

export const bodyBoldTypography = css`
  font-size: ${typographies.body.fontSize}px;
  font-weight: ${typographies.body.fontWeight.bold};
  line-height: ${typographies.body.lineHeight}px;
`;

export const subheading1RegularTypography = css`
  font-size: ${typographies.subheading1.fontSize}px;
  font-weight: ${typographies.subheading1.fontWeight.regular};
`;

export const subheading1SemiboldTypography = css`
  font-size: ${typographies.subheading1.fontSize}px;
  font-weight: ${typographies.subheading1.fontWeight.semibold};
`;

export const subheading1BoldTypography = css`
  font-size: ${typographies.subheading1.fontSize}px;
  font-weight: ${typographies.subheading1.fontWeight.bold};
`;

export const subheading2RegularTypography = css`
  font-size: ${typographies.subheading2.fontSize}px;
  font-weight: ${typographies.subheading2.fontWeight.regular};
`;

export const subheading2BoldTypography = css`
  font-size: ${typographies.subheading2.fontSize}px;
  font-weight: ${typographies.subheading2.fontWeight.bold};
`;

export const codeRegularTypography = css`
  font-size: ${typographies.code.fontSize}px;
  font-weight: ${typographies.code.fontWeight.regular};
`;

export const displaySemiboldTypography = css`
  font-size: ${typographies.display.fontSize}px;
  font-weight: ${typographies.display.fontWeight.semibold};
`;

export const heading1SemiboldTypography = css`
  font-size: ${typographies.heading1.fontSize}px;
  font-weight: ${typographies.heading1.fontWeight.semibold};
`;

export const heading2BoldTypography = css`
  font-size: ${typographies.heading2.fontSize}px;
  font-weight: ${typographies.heading2.fontWeight.bold};
`;
