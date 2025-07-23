export const convertToMarkdown = (text: string) => {
  try {
    // First try to parse as JSON
    const parsedJSON = JSON.parse(text) as unknown;
    const formattedJSON = JSON.stringify(parsedJSON, null, 2);
    return `\`\`\`json\n${formattedJSON}\n\`\`\``;
  } catch {
    return text;
  }
};
