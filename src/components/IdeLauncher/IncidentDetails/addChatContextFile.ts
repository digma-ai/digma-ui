import axios, { isAxiosError } from "axios";
import type { AddChatContextFileResult } from "../types";

export const addChatContextFile = async (
  port: number,
  file: {
    name: string;
    content: string;
  }
): Promise<AddChatContextFileResult> => {
  try {
    await axios.post(
      `http://localhost:${port}/api/digma/chat/context/file`,
      file
    );
    return { result: "success" };
  } catch (error) {
    return {
      result: "failure",
      error: {
        message: isAxiosError(error)
          ? error.message
          : "Failed to add file to the chat context"
      }
    };
  }
};
