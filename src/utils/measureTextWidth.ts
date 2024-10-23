export interface FontOptions {
  fontSize: number;
  fontWeight: string | number;
  fontFamily: string;
}
export const measureTextWidth = (text: string, font: FontOptions) => {
  const { fontSize, fontWeight, fontFamily } = font;

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) {
    return 0;
  }

  context.font = `${fontWeight} ${fontSize} ${fontFamily}`;

  return context.measureText(text).width;
};
