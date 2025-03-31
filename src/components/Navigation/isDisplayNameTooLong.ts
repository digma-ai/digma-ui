export const isDisplayNameTooLong = (
  displayName: string,
  containerWidth: number
) => {
  const CHAR_WIDTH = 8; // in pixels
  const MAX_DISPLAY_NAME_OVERFLOW_RATIO = 1.5;
  const CONTAINER_PADDING = 64; // in pixels
  return (
    (displayName.length * CHAR_WIDTH) /
      Math.max(containerWidth - CONTAINER_PADDING, 1) >
    MAX_DISPLAY_NAME_OVERFLOW_RATIO
  );
};
