export const convertToMarkdown = (text: string) => {
  try {
    // First try to parse as JSON
    const parsedJSON = JSON.parse(text) as unknown;
    const formattedJSON = JSON.stringify(parsedJSON, null, 2);
    return `\`\`\`json\n${formattedJSON}\n\`\`\``;
  } catch {
    // If JSON parsing fails, check if it looks like structured data
    const trimmed = text.trim();

    // Check for Python list/object representation patterns
    if (
      (trimmed.startsWith("[") && trimmed.endsWith("]")) ||
      (trimmed.startsWith("(") && trimmed.endsWith(")")) ||
      (trimmed.includes("(") && trimmed.includes("=")) // Constructor-like syntax
    ) {
      return `\`\`\`python\n${text}\n\`\`\``;
    }

    return text;
  }
};
